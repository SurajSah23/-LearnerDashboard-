const API_BASE_URL = "http://live.jetlearn.com/api/dashboard/";

/**
 * Fetch dashboard data using jet_id or uuid
 * @param {string} jetId - The jet_id parameter
 * @param {string} uuid - The uuid parameter
 * @returns {Promise<Object>} - The dashboard data
 */
export const fetchDashboardData = async (jetId = null, uuid = null) => {
  try {
    let url = API_BASE_URL;
    const params = new URLSearchParams();

    if (jetId) {
      params.append("jet_id", jetId);
    } else if (uuid) {
      params.append("uuid", uuid);
    } else {
      throw new Error("Either jet_id or uuid must be provided");
    }

    url += `?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

/**
 * Parse start_time_cx to extract date and time
 * @param {string} startTimeCx - The start_time_cx field from API response
 * @returns {Object} - Object containing formatted date and time
 */
export const parseStartTime = (startTimeCx) => {
  console.log(
    "Parsing start_time_cx:",
    startTimeCx,
    "Type:",
    typeof startTimeCx
  );

  if (!startTimeCx || startTimeCx === null || startTimeCx === undefined) {
    console.log("start_time_cx is null/undefined, using default values");
    return {
      date: "14 Dec, 2025",
      time: "8:30 - 9:30 AM EST",
    };
  }

  try {
    // Handle the specific format: "DD-MM-YYYY, HH:MM:SS AM/PM TIMEZONE"
    let date;

    // Try parsing as-is first
    date = new Date(startTimeCx);
    console.log("First parse attempt:", date, "Valid:", !isNaN(date.getTime()));

    // Always try parsing the specific format to extract timezone
    console.log("Trying specific format parsing");

    // Parse format: "26-09-2025, 04:00:00 PM CEST"
    const match = startTimeCx.match(
      /(\d{1,2})-(\d{1,2})-(\d{4}),\s*(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)\s*(.+)/
    );

    console.log("Regex match result:", match);

    if (match) {
      const [, day, month, year, hour, minute, second, ampm, timezone] = match;

      // Convert to 24-hour format
      let hour24 = parseInt(hour);
      if (ampm === "PM" && hour24 !== 12) {
        hour24 += 12;
      } else if (ampm === "AM" && hour24 === 12) {
        hour24 = 0;
      }

      // Create date in ISO format (YYYY-MM-DDTHH:MM:SS)
      const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}T${hour24.toString().padStart(2, "0")}:${minute}:${second}`;

      // Try to parse the original string first to preserve timezone
      date = new Date(startTimeCx);

      // If that fails, try with ISO string
      if (isNaN(date.getTime())) {
        date = new Date(isoString);
      }

      // Store the timezone for later use
      date._originalTimezone = timezone;

      // Also store the original time components for display
      date._originalHour = hour24;
      date._originalMinute = minute;
      date._originalSecond = second;

      console.log(
        "Parsed from format:",
        isoString,
        "Result:",
        date,
        "Timezone:",
        timezone
      );
    } else {
      // Fallback: try other common formats
      const formats = [
        startTimeCx.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"), // YYYYMMDD -> YYYY-MM-DD
        startTimeCx.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2"), // MM/DD/YYYY -> YYYY-MM-DD
        startTimeCx.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$1-$2"), // DD-MM-YYYY -> YYYY-MM-DD
      ];

      for (const format of formats) {
        date = new Date(format);
        if (!isNaN(date.getTime())) {
          console.log("Successfully parsed with format:", format);
          break;
        }
      }
    }

    // Check if date is still invalid
    if (isNaN(date.getTime())) {
      console.error("Could not parse start_time_cx:", startTimeCx);
      return {
        date: "14 Dec, 2025",
        time: "8:30 - 9:30 AM EST",
      };
    }

    console.log("Parsed date:", date);

    // Format date as "DD MMM, YYYY"
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Format time as "HH:MM - HH:MM AM/PM TIMEZONE"
    let startTime, endTime;

    // If we have original time components, use them to avoid timezone conversion issues
    console.log("Checking for original time components:", {
      _originalHour: date._originalHour,
      _originalMinute: date._originalMinute,
      _originalTimezone: date._originalTimezone,
    });

    if (date._originalHour !== undefined) {
      console.log("Using original time components");
      const startHour = date._originalHour;
      const startMinute = date._originalMinute;
      const endHour = (startHour + 1) % 24;

      // Format start time
      const startHour12 =
        startHour === 0 ? 12 : startHour > 12 ? startHour - 12 : startHour;
      const startAmPm = startHour >= 12 ? "PM" : "AM";
      startTime = `${startHour12}:${startMinute} ${startAmPm}`;

      // Format end time
      const endHour12 =
        endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
      const endAmPm = endHour >= 12 ? "PM" : "AM";
      endTime = `${endHour12}:${startMinute} ${endAmPm}`;
    } else {
      // Fallback to original method
      console.log("Using fallback method with toLocaleTimeString");
      startTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Add 1 hour for end time (assuming 1-hour class)
      const endDate = new Date(date.getTime() + 60 * 60 * 1000);
      endTime = endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Use the original timezone if available, otherwise default to EST
    const timezone = date._originalTimezone || "EST";
    console.log("Final timezone being used:", timezone);

    const result = {
      date: formattedDate,
      time: `${startTime} - ${endTime} ${timezone}`,
    };

    console.log("Parsed result:", result);
    return result;
  } catch (error) {
    console.error("Error parsing start_time_cx:", error, "Value:", startTimeCx);
    return {
      date: "14 Dec, 2025",
      time: "8:30 - 9:30 AM EST",
    };
  }
};

/**
 * Extract jet_id or uuid from URL parameters
 * @returns {Object} - Object containing jetId and uuid
 */
export const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jetId = urlParams.get("jet_id");
  const uuid = urlParams.get("uuid");

  return { jetId, uuid };
};
