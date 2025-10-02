import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "./Header";
import { MdMessage } from "react-icons/md";
import { parseStartTime, sendJoinTrigger, getUrlParams } from "../services/api";

const CongratsScreen = ({ dashboardData }) => {
  // Get type from URL params to determine which time field to use
  const { type, jetId } = getUrlParams();

  // Use event_start_time_cx if type is "event", otherwise use start_time_cx
  const startTimeCx =
    type === "event"
      ? dashboardData?.event_start_time_cx
      : dashboardData?.start_time_cx;

  // Determine zoom link - assign based on jet_id last char if type is event and zoom_link is null
  const zoomLink = useMemo(() => {
    // If zoom_link exists in dashboardData, use it
    if (dashboardData?.zoom_link) {
      console.log(
        "Using zoom_link from dashboardData:",
        dashboardData.zoom_link
      );
      return dashboardData.zoom_link;
    }

    // If type is event and zoom_link is null, assign based on jet_id last character
    if (type === "event" && jetId) {
      const lastChar = jetId.charAt(jetId.length - 1).toUpperCase();
      if (lastChar === "C") {
        console.log(
          "Assigning zoom link for event (jet_id ends with C):",
          "https://zoom.us/j/96605171912"
        );
        return "https://zoom.us/j/96605171912";
      } else if (lastChar === "M") {
        console.log(
          "Assigning zoom link for event (jet_id ends with M):",
          "https://zoom.us/j/96332836058"
        );
        return "https://zoom.us/j/96332836058";
      }
    }

    // Return null if no conditions match
    console.log("No zoom link assigned, returning null");
    return dashboardData?.zoom_link || null;
  }, [dashboardData?.zoom_link, type, jetId]);

  // Assign zoom link to dashboardData if it's null
  if (dashboardData && !dashboardData.zoom_link && zoomLink) {
    dashboardData.zoom_link = zoomLink;
    console.log("Assigned zoom_link to dashboardData:", zoomLink);
  }

  // Parse start_time_cx to get formatted date and time
  let parsedDateTime = parseStartTime(startTimeCx);

  // If event_start_time_cx is null and type is event, set to next day 9:30 - 10:30 PM IST
  if (type === "event" && !startTimeCx) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedDate = tomorrow.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    parsedDateTime = {
      date: formattedDate,
      time: "9:30 - 10:30 PM IST",
    };

    console.log(
      "Event start time is null, using next day default:",
      parsedDateTime
    );
  }

  const { date, time } = parsedDateTime;

  // Log the assigned zoom link
  console.log("=== ZOOM LINK ASSIGNED ===");
  console.log("Zoom Link:", zoomLink);
  console.log("Type:", type);
  console.log("Jet ID:", jetId);
  console.log("Dashboard zoom_link:", dashboardData?.zoom_link);
  console.log("==========================");

  // State for tracking button status
  const [isAutoRedirected, setIsAutoRedirected] = useState(false);
  const [classHasEnded, setClassHasEnded] = useState(false);

  // Determine the schedule text based on type parameter
  const scheduleText = dashboardData?.isGeneric
    ? "Are you all set to start an exciting adventure into"
    : type === "trial"
    ? "Your trial class has been scheduled for"
    : type === "paid"
    ? "Your next class is scheduled for"
    : type === "event"
    ? "Your upcoming event is scheduled for"
    : "Your class has been scheduled for:";

  // Check if the class date is today (using UTC start_time for accurate comparison)
  const isToday = useCallback(() => {
    if (!dashboardData?.start_time) return false;

    try {
      const classDate = new Date(dashboardData.start_time);
      const today = new Date();

      // Compare dates (ignore time)
      return classDate.toDateString() === today.toDateString();
    } catch (error) {
      console.error("Error checking if date is today:", error);
      return false;
    }
  }, [dashboardData?.start_time]);

  // Calculate time until class starts (using UTC start_time for accurate calculation)
  const calculateTimeUntilClass = useCallback(() => {
    if (!dashboardData?.start_time) return null;

    try {
      const classDate = new Date(dashboardData.start_time);
      const now = new Date();
      const timeDiff = classDate.getTime() - now.getTime();

      return timeDiff; // Returns milliseconds until class
    } catch (error) {
      console.error("Error calculating time until class:", error);
      return null;
    }
  }, [dashboardData?.start_time]);

  // Memoized time calculations to prevent unnecessary recalculations
  const timeCalculations = useMemo(() => {
    const timeDiff = calculateTimeUntilClass();
    return {
      timeDiff,
      isWithinFiveMinutes:
        timeDiff !== null && timeDiff <= 300000 && timeDiff > 0,
      hasClassStarted: timeDiff !== null && timeDiff <= 0,
    };
  }, [calculateTimeUntilClass]);

  // Check if class is within 5 minutes (300,000 milliseconds)
  const isWithinFiveMinutes = () => timeCalculations.isWithinFiveMinutes;

  // Check if class has started (time is negative)
  const hasClassStarted = () => timeCalculations.hasClassStarted;

  // Update time with smart intervals
  useEffect(() => {
    if (!dashboardData?.start_time) return;

    const calculateTimeUntilClassLocal = () => {
      try {
        const classDate = new Date(dashboardData.start_time);
        const now = new Date();
        const timeDiff = classDate.getTime() - now.getTime();

        return timeDiff; // Returns milliseconds until class
      } catch (error) {
        console.error("Error calculating time until class:", error);
        return null;
      }
    };

    const handleAutoRedirectLocal = () => {
      const timeDiff = calculateTimeUntilClassLocal();
      // Auto-redirect exactly when it's time for the class (when class starts)
      if (
        timeDiff !== null &&
        timeDiff <= 0 && // Exactly when class starts
        zoomLink &&
        !isAutoRedirected
      ) {
        setIsAutoRedirected(true);
        window.open(zoomLink, "_blank", "noopener,noreferrer");
      }
    };

    const checkClassEnded = () => {
      if (!dashboardData?.end_time) return false;
      try {
        const endDate = new Date(dashboardData.end_time);
        const now = new Date();
        const hasEnded = now.getTime() > endDate.getTime();

        return hasEnded;
      } catch (error) {
        console.error("Error checking if class has ended:", error);
        return false;
      }
    };

    // Initial calculation
    const initialClassEnded = checkClassEnded();
    setClassHasEnded(initialClassEnded);
    handleAutoRedirectLocal();

    let timer = setInterval(() => {
      calculateTimeUntilClassLocal();
      const classEnded = checkClassEnded();
      setClassHasEnded(classEnded);
      handleAutoRedirectLocal();
    }, 60000); // Always 1 minute

    return () => clearInterval(timer);
  }, [
    dashboardData?.start_time,
    dashboardData?.end_time,
    zoomLink,
    isAutoRedirected,
    classHasEnded,
  ]);

  // Check if Join Now button should be active
  // Button is active if: has zoom link, is today, either within 5 minutes OR class has started, AND class has not ended
  const isJoinButtonActive =
    zoomLink &&
    isToday() &&
    (isWithinFiveMinutes() || hasClassStarted()) &&
    !classHasEnded;

  // Memoized button text to prevent unnecessary recalculations
  const buttonText = useMemo(() => {
    if (classHasEnded) {
      return "Class Ended";
    } else {
      return "Join Now";
    }
  }, [classHasEnded]);

  // Log class timing and button status
  console.log("=== CLASS TIMING STATUS ===");
  console.log("Class start time (UTC):", dashboardData?.start_time);
  console.log("Class end time (UTC):", dashboardData?.end_time);
  console.log(
    "Class start time (local):",
    dashboardData?.start_time
      ? new Date(dashboardData.start_time).toString()
      : "N/A"
  );
  console.log(
    "Class end time (local):",
    dashboardData?.end_time
      ? new Date(dashboardData.end_time).toString()
      : "N/A"
  );
  console.log("Current time (UTC):", new Date().toISOString());
  console.log("Current time (local):", new Date().toString());
  console.log("Button should be active:", isJoinButtonActive);
  console.log("Button text:", buttonText);
  console.log("Is today:", isToday());
  console.log("Is within 5 minutes:", isWithinFiveMinutes());
  console.log("Has class started:", hasClassStarted());
  console.log("Class has ended:", classHasEnded);
  console.log("Time calculations:", timeCalculations);
  console.log("==========================");

  // Handle Join Now button click
  const handleJoinNow = async () => {
    if (isJoinButtonActive && zoomLink) {
      try {
        // Get jet_id from URL params
        const { jetId } = getUrlParams();

        // Send join trigger to API
        if (jetId) {
          await sendJoinTrigger(jetId);
        }
      } catch (error) {
        console.error("Error sending join trigger:", error);
        // Continue to open zoom link even if API call fails
      }

      // Open zoom link
      window.open(zoomLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="overflow-hidden relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <Header />
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-3 py-4">
          {/* Main Heading - Centered */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-gray-900 mb-3">
              You are all set!
            </h1>

            <p className="text-sm text-gray-600 leading-relaxed mx-auto px-2">
              <span className="font-semibold text-gray-800">
                {dashboardData?.student_name || "Emily"}
              </span>{" "}
              is ready to start an exciting
              <br />
              adventure into the world of tech
              <br />
              with JetLearn.
            </p>
          </div>

          {/* Girl Illustration with Original Background */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              {/* Girl Image */}
              <div className="relative z-10 flex justify-center items-center h-full">
                <img
                  src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/67371c611162209f4eb93108_thank%20you%20hero%20image.avif"
                  alt="Happy girl with headphones celebrating"
                  className="w-36 h-auto"
                  style={{
                    filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.08))",
                    transform: "rotate(8deg)",
                  }}
                />
              </div>

              {/* Original Background SVG Pattern */}
              <div className="absolute inset-0">
                <img
                  src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/6706694ab0057f527def00ec_Contact%20hero%20bg%20img.svg"
                  alt="Background pattern"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Class Schedule Section */}
          <div className="mb-3 xs:mb-4">
            <p className="text-xs text-gray-600 mb-2 px-2 text-center">
              {scheduleText}
            </p>
            {!dashboardData?.isGeneric && (
              <>
                <div className="flex items-center justify-center space-x-2 font-sans mx-auto px-3 py-2 rounded-lg max-w-sm">
                  {/* Left Section */}
                  <div className="flex flex-col">
                    <span className="text-[#00A0DF] font-semibold text-[14px] leading-[18px] tracking-tight">
                      {date}
                    </span>
                    <span className="text-[#00A0DF] font-semibold text-[14px] leading-[18px] tracking-tight">
                      {time}
                    </span>
                  </div>

                  {/* Right Section - Button */}
                  <button
                    onClick={handleJoinNow}
                    disabled={!isJoinButtonActive}
                    className={`text-[12px] font-medium px-3 py-1.5 rounded-full transition-colors ${
                      isJoinButtonActive
                        ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                        : "bg-[#E0E0E0] text-[#999999] cursor-not-allowed"
                    }`}
                  >
                    {buttonText}
                  </button>
                </div>

                <p className="text-xs text-gray-500 px-2 text-center">
                  You will receive the details for the class on
                  <br />
                  your registered email and on WhatsApp.
                </p>
              </>
            )}
          </div>

          {/* Invite Friends Section */}
          <div className="bg-gradient-to-r from-teal-500 to-green-400 rounded-lg p-2 mb-4 relative overflow-hidden max-w-sm mx-auto">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-2">
                <h3 className="text-white text-sm font-bold mb-2">
                  Invite friends,
                  <br />
                  win rewards
                </h3>

                <input
                  type="email"
                  placeholder="Enter Email to Invite"
                  className="px-2 py-1.5 rounded font-medium text-xs bg-white w-full max-w-[180px]"
                />
              </div>

              {/* Original Prize Images */}
              <div className="flex-shrink-0">
                <img
                  src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/68bfd8f40c201171a65eff34_Referral%20Website%20Multi-Design%20(7).png"
                  alt="Referral design decoration"
                  className="w-32 h-28 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col lg:flex-row items-start gap-0">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 px-4 sm:px-6 md:px-8 py-4 lg:ml-16">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 md:mb-8 leading-tight">
              You are all set!
            </h1>

            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 xs:mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              <span className="font-semibold text-gray-800">
                {dashboardData?.student_name || "Emily"}
              </span>{" "}
              is ready to start an exciting adventure into
              <br className="hidden sm:block" />
              the world of tech with JetLearn.
            </p>

            {/* Schedule Info Section - Image-like Positioning */}
            <div className="mb-4 xs:mb-6 sm:mb-8 md:mb-10">
              <div className="w-full flex items-center justify-start relative min-h-[150px] xs:min-h-[180px] sm:min-h-[200px]">
                {/* Main Content Container - Similar to Image Container */}
                <div className="relative z-10 flex items-center justify-start w-full">
                  <div className="text-left w-full">
                    {/* Schedule Text Content */}
                    <div className="relative inline-block w-full">
                      <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 xs:mb-4 sm:mb-6 relative z-20">
                        {scheduleText}
                      </p>

                      {!dashboardData?.isGeneric && (
                        <>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 xs:gap-4 sm:gap-8 mb-3 xs:mb-4 sm:mb-6 relative z-20">
                            <div className="flex flex-col">
                              <div className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-500 mb-1 xs:mb-2">
                                {date}
                              </div>
                              <div className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-500">
                                {time}
                              </div>
                            </div>
                            <button
                              onClick={handleJoinNow}
                              disabled={!isJoinButtonActive}
                              className={`px-4 xs:px-6 sm:px-8 py-2 xs:py-2 sm:py-3 rounded-full font-semibold text-sm xs:text-base sm:text-lg transition-colors w-full sm:w-auto relative z-20 ${
                                isJoinButtonActive
                                  ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {buttonText}
                            </button>
                          </div>

                          <p className="text-sm sm:text-base text-gray-500 relative z-20">
                            You will receive the details for the class on your
                            registered
                            <br className="hidden sm:block" />
                            your registered email and on WhatsApp.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Optional: Background Pattern Overlay (similar to image background) */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-gradient-to-r from-blue-50 to-green-50 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Invite Friends Section */}
            <div className="bg-gradient-to-r from-blue-400 via-blue-400 to-green-500 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-6 relative overflow-hidden lg:p-8 max-w-lg">
              <div className="relative z-10">
                <h3 className="text-white text-lg xs:text-xl sm:text-2xl font-bold mb-3 xs:mb-4">
                  Invite friends,
                  <br />
                  win rewards
                </h3>

                <div className="mt-3 xs:mt-4">
                  <input
                    type="email"
                    placeholder="Enter Email to Invite"
                    className="px-3 xs:px-3 sm:px-3 py-2 xs:py-2 sm:py-2.5 rounded-lg font-medium text-sm xs:text-sm sm:text-sm bg-white w-full sm:w-auto min-w-0 sm:min-w-[160px] max-w-[180px]"
                  />
                </div>
              </div>

              {/* Decorative elements - Referral Design */}
              <div className="absolute right-1 xs:right-2 sm:right-3 top-1 xs:top-2 sm:top-3">
                <img
                  src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/68bfd8f40c201171a65eff34_Referral%20Website%20Multi-Design%20(7).png"
                  alt="Referral design decoration"
                  className="w-32 h-24 xs:w-36 xs:h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 -translate-y-1 xs:-translate-y-2 sm:-translate-y-3 opacity-60 xs:opacity-80 sm:opacity-100 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Desktop Only: Right Content - Child with Laptop */}
          <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center relative mt-6 xs:mt-8 lg:mt-0 min-h-[250px] xs:min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="text-center">
                {/* Girl Image */}
                <div className="relative inline-block">
                  <img
                    src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/67371c611162209f4eb93108_thank%20you%20hero%20image.avif"
                    alt="Happy girl with headphones celebrating"
                    className="w-[250px] xs:w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto relative z-20"
                    style={{
                      filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.08))",
                      transform: "rotate(8deg)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Background SVG Pattern Overlay */}
            <div className="absolute inset-0">
              <img
                src="https://cdn.prod.website-files.com/61f64598c68d4ab53ecff616/6706694ab0057f527def00ec_Contact%20hero%20bg%20img.svg"
                alt="Background pattern"
                className="w-full h-full object-contain opacity-50 sm:opacity-75 lg:opacity-100"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Contact Widget */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-3 xs:bottom-4 sm:bottom-6 right-3 xs:right-4 sm:right-6 bg-white rounded-lg xs:rounded-xl shadow-lg p-2 xs:p-3 sm:p-5 flex items-center gap-2 xs:gap-3 sm:gap-4 max-w-[280px] xs:max-w-xs sm:max-w-sm z-50 hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="rounded-full flex items-center justify-center flex-shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-6 h-6 xs:w-8 xs:h-8 sm:w-12 sm:h-12"
            />
          </div>
          <div className="min-w-0 hidden sm:block">
            <div className="font-semibold text-xs xs:text-sm sm:text-base text-gray-800">
              Have any queries?
            </div>
            <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-tight">
              Reach out to our support team on
              <br />
              WhatsApp:{" "}
              <span className="cursor-pointer transition-colors">
                +91 98765 43210
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default CongratsScreen;
