const API_BASE_URL = "https://live.jetlearn.com/api/";

/**
 * Fetch dashboard data using jet_id or uuid
 * @param {string} jetId - The jet_id parameter
 * @param {string} uuid - The uuid parameter
 * @returns {Promise<Object>} - The dashboard data
 */
export const fetchDashboardData = async (jetId = null, type = "trial") => {
  try {
    let url = `${API_BASE_URL}dashboard`;
    const params = new URLSearchParams();

    console.log("fetchDashboardData called with:", { jetId, type });

    if (jetId) {
      params.append("jet_id", jetId);
    } else {
      throw new Error("jet_id  must be provided");
    }
    if (type) {
      params.append("type", type);
    } else {
      throw new Error("type must be provided");
    }

    url += `?${params.toString()}`;

    console.log("Final URL:", url);
    console.log("URL params:", params.toString());

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status === "error") {
      console.warn("API returned error status:", data.message);
      // Return basic page structure with no data
      return {
        status: "error",
        message: data.message,
        student_name: "Student",
        child_name: "Student",
        start_time_cx: null,
        event_start_time_cx: null,
        zoom_link: null,
        isGeneric: true,
      };
    }
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Return basic page structure for any error
    return {
      status: "error",
      message: error.message || "An error occurred",
      student_name: "Student",
      child_name: "Student",
      start_time_cx: null,
      event_start_time_cx: null,
      zoom_link: null,
      isGeneric: true,
    };
  }
};

/**
 * Convert IANA timezone identifier to timezone abbreviation
 * @param {string} timezone - IANA timezone identifier (e.g., "Europe/London", "Asia/Kolkata")
 * @returns {string} - Timezone abbreviation (e.g., "BST", "IST")
 */
const getTimezoneAbbreviation = (timezone) => {
  if (!timezone) return "GMT";

  // Mapping of IANA timezone identifiers to their standard abbreviations
  const timezoneAbbreviations = {
    // Europe
    "Europe/London": "GMT", // Will be BST in summer, but we'll handle that
    "Europe/Dublin": "GMT",
    "Europe/Paris": "CET",
    "Europe/Berlin": "CET",
    "Europe/Rome": "CET",
    "Europe/Madrid": "CET",
    "Europe/Amsterdam": "CET",
    "Europe/Brussels": "CET",
    "Europe/Vienna": "CET",
    "Europe/Zurich": "CET",
    "Europe/Stockholm": "CET",
    "Europe/Oslo": "CET",
    "Europe/Copenhagen": "CET",
    "Europe/Helsinki": "EET",
    "Europe/Athens": "EET",
    "Europe/Istanbul": "TRT",
    "Europe/Moscow": "MSK",

    // Asia
    "Asia/Kolkata": "IST",
    "Asia/Dhaka": "BST",
    "Asia/Karachi": "PKT",
    "Asia/Colombo": "IST",
    "Asia/Kathmandu": "NPT",
    "Asia/Thimphu": "BTT",
    "Asia/Dubai": "GST",
    "Asia/Muscat": "GST",
    "Asia/Kuwait": "AST",
    "Asia/Riyadh": "AST",
    "Asia/Bahrain": "AST",
    "Asia/Qatar": "AST",
    "Asia/Tehran": "IRST",
    "Asia/Tokyo": "JST",
    "Asia/Seoul": "KST",
    "Asia/Shanghai": "CST",
    "Asia/Hong_Kong": "HKT",
    "Asia/Singapore": "SGT",
    "Asia/Bangkok": "ICT",
    "Asia/Jakarta": "WIB",
    "Asia/Manila": "PHT",
    "Asia/Kuala_Lumpur": "MYT",
    "Asia/Ho_Chi_Minh": "ICT",
    "Asia/Taipei": "CST",
    "Asia/Macau": "CST",
    "Asia/Ulaanbaatar": "ULAT",
    "Asia/Vladivostok": "VLAT",
    "Asia/Yakutsk": "YAKT",
    "Asia/Omsk": "OMST",
    "Asia/Novosibirsk": "NOVT",
    "Asia/Krasnoyarsk": "KRAT",
    "Asia/Irkutsk": "IRKT",
    "Asia/Yekaterinburg": "YEKT",
    "Asia/Samara": "SAMT",
    "Asia/Volgograd": "VOLT",

    // Americas
    "America/New_York": "EST",
    "America/Chicago": "CST",
    "America/Denver": "MST",
    "America/Los_Angeles": "PST",
    "America/Phoenix": "MST",
    "America/Anchorage": "AKST",
    "America/Honolulu": "HST",
    "America/Toronto": "EST",
    "America/Vancouver": "PST",
    "America/Montreal": "EST",
    "America/Winnipeg": "CST",
    "America/Edmonton": "MST",
    "America/Calgary": "MST",
    "America/Regina": "CST",
    "America/St_Johns": "NST",
    "America/Halifax": "AST",
    "America/Glace_Bay": "AST",
    "America/Moncton": "AST",
    "America/Goose_Bay": "AST",
    "America/Blanc-Sablon": "AST",
    "America/Mexico_City": "CST",
    "America/Cancun": "EST",
    "America/Merida": "CST",
    "America/Monterrey": "CST",
    "America/Matamoros": "CST",
    "America/Mazatlan": "MST",
    "America/Chihuahua": "MST",
    "America/Ojinaga": "MST",
    "America/Hermosillo": "MST",
    "America/Tijuana": "PST",
    "America/Bahia_Banderas": "CST",
    "America/Sao_Paulo": "BRT",
    "America/Argentina/Buenos_Aires": "ART",
    "America/Santiago": "CLT",
    "America/Lima": "PET",
    "America/Bogota": "COT",
    "America/Caracas": "VET",
    "America/La_Paz": "BOT",
    "America/Asuncion": "PYT",
    "America/Montevideo": "UYT",
    "America/Guyana": "GYT",
    "America/Paramaribo": "SRT",
    "America/Cayenne": "GFT",
    "America/Fortaleza": "BRT",
    "America/Recife": "BRT",
    "America/Araguaina": "BRT",
    "America/Maceio": "BRT",
    "America/Bahia": "BRT",
    "America/Santarem": "BRT",
    "America/Porto_Velho": "AMT",
    "America/Boa_Vista": "AMT",
    "America/Manaus": "AMT",
    "America/Eirunepe": "AMT",
    "America/Rio_Branco": "AMT",
    "America/Nassau": "EST",
    "America/Barbados": "AST",
    "America/Belize": "CST",
    "America/Costa_Rica": "CST",
    "America/El_Salvador": "CST",
    "America/Guatemala": "CST",
    "America/Tegucigalpa": "CST",
    "America/Managua": "CST",
    "America/Panama": "EST",
    "America/Cayman": "EST",
    "America/Jamaica": "EST",
    "America/Havana": "CST",
    "America/Port-au-Prince": "EST",
    "America/Santo_Domingo": "AST",
    "America/Puerto_Rico": "AST",
    "America/St_Thomas": "AST",
    "America/St_Lucia": "AST",
    "America/St_Vincent": "AST",
    "America/Grenada": "AST",
    "America/Dominica": "AST",
    "America/Antigua": "AST",
    "America/St_Kitts": "AST",
    "America/Guadeloupe": "AST",
    "America/Martinique": "AST",
    "America/Aruba": "AST",
    "America/Curacao": "AST",
    "America/Lower_Princes": "AST",
    "America/Marigot": "AST",
    "America/St_Barthelemy": "AST",
    "America/Kralendijk": "AST",
    "America/Philipsburg": "AST",
    "America/Anguilla": "AST",
    "America/Montserrat": "AST",
    "America/Tortola": "AST",
    "America/Virgin": "AST",
    "America/Port_of_Spain": "AST",
    "America/St_Johns": "NST",
    "America/Halifax": "AST",
    "America/Glace_Bay": "AST",
    "America/Moncton": "AST",
    "America/Goose_Bay": "AST",
    "America/Blanc-Sablon": "AST",

    // Africa
    "Africa/Cairo": "EET",
    "Africa/Johannesburg": "SAST",
    "Africa/Lagos": "WAT",
    "Africa/Casablanca": "WET",
    "Africa/Algiers": "CET",
    "Africa/Tunis": "CET",
    "Africa/Tripoli": "EET",
    "Africa/Khartoum": "CAT",
    "Africa/Addis_Ababa": "EAT",
    "Africa/Nairobi": "EAT",
    "Africa/Dar_es_Salaam": "EAT",
    "Africa/Kampala": "EAT",
    "Africa/Kigali": "CAT",
    "Africa/Bujumbura": "CAT",
    "Africa/Gaborone": "CAT",
    "Africa/Harare": "CAT",
    "Africa/Lusaka": "CAT",
    "Africa/Maputo": "CAT",
    "Africa/Windhoek": "WAT",
    "Africa/Luanda": "WAT",
    "Africa/Porto-Novo": "WAT",
    "Africa/Douala": "WAT",
    "Africa/Libreville": "WAT",
    "Africa/Malabo": "WAT",
    "Africa/Niamey": "WAT",
    "Africa/Ndjamena": "WAT",
    "Africa/Bangui": "WAT",
    "Africa/Brazzaville": "WAT",
    "Africa/Kinshasa": "WAT",
    "Africa/Lubumbashi": "CAT",
    "Africa/Bujumbura": "CAT",
    "Africa/Kigali": "CAT",
    "Africa/Gitega": "CAT",
    "Africa/Dodoma": "EAT",
    "Africa/Asmara": "EAT",
    "Africa/Asmera": "EAT",
    "Africa/Mogadishu": "EAT",
    "Africa/Djibouti": "EAT",
    "Africa/Kampala": "EAT",
    "Africa/Khartoum": "CAT",
    "Africa/Juba": "CAT",
    "Africa/Bamako": "GMT",
    "Africa/Banjul": "GMT",
    "Africa/Bissau": "GMT",
    "Africa/Conakry": "GMT",
    "Africa/Dakar": "GMT",
    "Africa/Freetown": "GMT",
    "Africa/Lome": "GMT",
    "Africa/Monrovia": "GMT",
    "Africa/Nouakchott": "GMT",
    "Africa/Ouagadougou": "GMT",
    "Africa/Sao_Tome": "GMT",
    "Africa/Accra": "GMT",
    "Africa/Abidjan": "GMT",
    "Africa/Yamoussoukro": "GMT",
    "Africa/El_Aaiun": "WET",
    "Africa/Ceuta": "CET",
    "Africa/Melilla": "CET",

    // Australia/Oceania
    "Australia/Sydney": "AEST",
    "Australia/Melbourne": "AEST",
    "Australia/Brisbane": "AEST",
    "Australia/Perth": "AWST",
    "Australia/Adelaide": "ACST",
    "Australia/Darwin": "ACST",
    "Australia/Hobart": "AEST",
    "Australia/Currie": "AEST",
    "Australia/Lord_Howe": "LHST",
    "Australia/Broken_Hill": "ACST",
    "Australia/Eucla": "ACWST",
    "Australia/Lindeman": "AEST",
    "Australia/Canberra": "AEST",
    "Australia/ACT": "AEST",
    "Australia/NSW": "AEST",
    "Australia/North": "ACST",
    "Australia/South": "ACST",
    "Australia/Tasmania": "AEST",
    "Australia/Victoria": "AEST",
    "Australia/West": "AWST",
    "Australia/Queensland": "AEST",
    "Pacific/Auckland": "NZST",
    "Pacific/Chatham": "CHAST",
    "Pacific/Fiji": "FJT",
    "Pacific/Tongatapu": "TOT",
    "Pacific/Apia": "WST",
    "Pacific/Honolulu": "HST",
    "Pacific/Guam": "ChST",
    "Pacific/Saipan": "ChST",
    "Pacific/Port_Moresby": "PGT",
    "Pacific/Noumea": "NCT",
    "Pacific/Vanuatu": "VUT",
    "Pacific/Solomon": "SBT",
    "Pacific/Norfolk": "NFT",
    "Pacific/Palau": "PWT",
    "Pacific/Majuro": "MHT",
    "Pacific/Kwajalein": "MHT",
    "Pacific/Tarawa": "GILT",
    "Pacific/Enderbury": "PHOT",
    "Pacific/Fakaofo": "TKT",
    "Pacific/Tahiti": "TAHT",
    "Pacific/Marquesas": "MART",
    "Pacific/Gambier": "GAMT",
    "Pacific/Pitcairn": "PST",
    "Pacific/Easter": "EAST",
    "Pacific/Galapagos": "GALT",
    "Pacific/Rarotonga": "CKT",
    "Pacific/Niue": "NUT",
    "Pacific/Tokelau": "TKT",
    "Pacific/Wake": "WAKT",
    "Pacific/Chuuk": "CHUT",
    "Pacific/Pohnpei": "PONT",
    "Pacific/Kosrae": "KOST",
    "Pacific/Yap": "CHUT",
    "Pacific/Palikir": "PONT",
    "Pacific/Bougainville": "BST",
    "Pacific/Norfolk": "NFT",
    "Pacific/Pitcairn": "PST",
    "Pacific/Easter": "EAST",
    "Pacific/Galapagos": "GALT",
    "Pacific/Rarotonga": "CKT",
    "Pacific/Niue": "NUT",
    "Pacific/Tokelau": "TKT",
    "Pacific/Wake": "WAKT",
    "Pacific/Chuuk": "CHUT",
    "Pacific/Pohnpei": "PONT",
    "Pacific/Kosrae": "KOST",
    "Pacific/Yap": "CHUT",
    "Pacific/Palikir": "PONT",
    "Pacific/Bougainville": "BST",
  };

  // Check if we have a direct mapping
  if (timezoneAbbreviations[timezone]) {
    return timezoneAbbreviations[timezone];
  }

  // For Europe/London, check if it's currently BST (British Summer Time)
  if (timezone === "Europe/London") {
    try {
      const now = new Date();
      const isDST = now
        .toLocaleString("en", {
          timeZone: timezone,
          timeZoneName: "short",
        })
        .includes("BST");
      return isDST ? "BST" : "GMT";
    } catch (error) {
      return "GMT";
    }
  }

  // For other timezones, try to get a reasonable abbreviation
  try {
    const now = new Date();
    const parts = now
      .toLocaleString("en", {
        timeZone: timezone,
        timeZoneName: "short",
      })
      .split(" ");

    // If it's an offset format like "GMT+5:30", try to map to common abbreviations
    const timezonePart = parts[parts.length - 1];
    if (timezonePart.includes("GMT")) {
      // Map common GMT offsets to their standard abbreviations
      const offsetMap = {
        "GMT+5:30": "IST",
        "GMT+5": "PKT",
        "GMT+6": "BST",
        "GMT+8": "CST",
        "GMT+9": "JST",
        "GMT-5": "EST",
        "GMT-6": "CST",
        "GMT-7": "MST",
        "GMT-8": "PST",
      };

      if (offsetMap[timezonePart]) {
        return offsetMap[timezonePart];
      }
    }

    return timezonePart || timezone;
  } catch (error) {
    console.warn("Error getting timezone abbreviation:", error);
    return timezone;
  }
};

/**
 * Parse start_time_cx to extract date and time
 * @param {string} startTimeCx - The start_time_cx field from API response
 * @param {string} browserTimezone - Optional browser timezone (e.g., from browserData.timezone.timezone)
 * @returns {Object} - Object containing formatted date and time
 */
export const parseStartTime = (startTimeCx, browserTimezone = null) => {
  console.log(
    "Parsing start_time_cx:",
    startTimeCx,
    "Type:",
    typeof startTimeCx
  );

  if (!startTimeCx || startTimeCx === null || startTimeCx === undefined) {
    console.log("start_time_cx is null/undefined, using default values");
    const defaultTimezone = browserTimezone || "Europe/London";

    // Get today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timezoneAbbreviation = getTimezoneAbbreviation(defaultTimezone);

    return {
      date: formattedDate,
      time: `5:00 - 6:00 PM ${timezoneAbbreviation}`,
    };
  }

  try {
    // Handle the specific format: "DD-MM-YYYY, HH:MM:SS AM/PM TIMEZONE"
    let date;

    // Always try parsing the specific format to extract timezone
    console.log("Trying specific format parsing");

    // Parse format: "04-10-2025, 01:00:00 PM EDT" (DD-MM-YYYY format)
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

      // Use the ISO string to avoid MM-DD-YYYY parsing issues
      date = new Date(isoString);

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
        date: "Sunday, 14 Dec, 2025",
        time: "8:30 - 9:30 AM EST",
      };
    }

    console.log("Parsed date:", date);

    // Format date as "Weekday, DD MMM, YYYY"
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
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
      // Fallback to original method with browser timezone
      console.log("Using fallback method with toLocaleTimeString");
      const timezoneOptions = browserTimezone
        ? { timeZone: browserTimezone }
        : {};

      startTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        ...timezoneOptions,
      });

      // Add 1 hour for end time (assuming 1-hour class)
      const endDate = new Date(date.getTime() + 60 * 60 * 1000);
      endTime = endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        ...timezoneOptions,
      });
    }

    // Use the original timezone if available, otherwise use browser timezone, then default to Europe/London
    const timezoneIdentifier =
      date._originalTimezone || browserTimezone || "Europe/London";
    const timezoneAbbreviation = getTimezoneAbbreviation(timezoneIdentifier);

    console.log("Final timezone identifier being used:", timezoneIdentifier);
    console.log("Timezone abbreviation:", timezoneAbbreviation);
    console.log("Browser timezone provided:", browserTimezone);

    const result = {
      date: formattedDate,
      time: `${startTime} - ${endTime} ${timezoneAbbreviation}`,
    };

    console.log("Parsed result:", result);
    return result;
  } catch (error) {
    console.error("Error parsing start_time_cx:", error, "Value:", startTimeCx);
    const defaultTimezone = browserTimezone || "Europe/London";

    // Get today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timezoneAbbreviation = getTimezoneAbbreviation(defaultTimezone);

    return {
      date: formattedDate,
      time: `5:00 - 6:00 PM ${timezoneAbbreviation}`,
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
  const type = urlParams.get("type");

  return { jetId, type };
};

/**
 * Send browser data to the backend
 * @param {Object} browserData - The collected browser data
 * @param {string} jetId - Optional jet_id parameter
 * @param {string} uuid - Optional uuid parameter
 * @returns {Promise<Object>} - The response from the server
 */
export const sendBrowserDataToBackend = async (
  browserData,
  jetId = null,
  type = "trial"
) => {
  try {
    console.log(
      "Sending browser data to the backend",
      browserData.browser.userAgent
    );

    const url = `${API_BASE_URL}dashboard-visits/`;
    const payload = {
      learner_uid: jetId,
      user_agent: browserData.browser.userAgent,
      browser_name: browserData.browser.browserName,
      platform: browserData.browser.platform,
      screen_width: browserData.screen.width,
      screen_height: browserData.screen.height,
      actual_width: browserData.screen.availWidth,
      actual_height: browserData.screen.availHeight,
      device_pixel_ratio: browserData.screen.devicePixelRatio,
      timezone: browserData.timezone.timezone,
      page_url: browserData.page.url,
      internet_speed: browserData.network.connection.downlink,
      internet_type: browserData.network.connection.effectiveType,
      user_type: type || "trial",
      joined_class: false,
      ipAddress: browserData.ipAddress.publicIP,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending browser data:", error);
    throw error;
  }
};

/**
 * Send join class trigger to the backend
 * @param {string} jetId - The jet_id parameter
 * @returns {Promise<Object>} - The response from the server
 */
export const sendJoinTrigger = async (jetId) => {
  try {
    console.log("Sending join trigger for learner:", jetId);

    const url = `${API_BASE_URL}dashboard-visits/join/`;
    const payload = {
      learner_uid: jetId,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Join trigger sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending join trigger:", error);
    throw error;
  }
};
