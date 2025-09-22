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
      headers: {
        "Content-Type": "application/json",
      },
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

    // If invalid, try parsing the specific format
    if (isNaN(date.getTime())) {
      console.log("First parse failed, trying specific format parsing");

      // Parse format: "26-09-2025, 04:00:00 PM CEST"
      const match = startTimeCx.match(
        /(\d{1,2})-(\d{1,2})-(\d{4}),\s*(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)\s*(.+)/
      );

      if (match) {
        const [, day, month, year, hour, minute, second, ampm, timezone] =
          match;

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
        date = new Date(isoString);

        // Store the timezone for later use
        date._originalTimezone = timezone;

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
    const startTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Add 1 hour for end time (assuming 1-hour class)
    const endDate = new Date(date.getTime() + 60 * 60 * 1000);
    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Use the original timezone if available, otherwise default to EST
    const timezone = date._originalTimezone || "EST";

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
