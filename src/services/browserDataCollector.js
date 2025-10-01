/**
 * Comprehensive Browser Data Collection Service
 * Captures browser details, screen info, timezone, language, storage, network, and performance data
 */

/**
 * Get browser information
 */
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const browserName = getBrowserName(userAgent);
  const browserVersion = getBrowserVersion(userAgent, browserName);

  return {
    userAgent,
    browserName,
    browserVersion,
    platform: navigator.platform,
    vendor: navigator.vendor,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    language: navigator.language,
    languages: navigator.languages,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints,
    webdriver: navigator.webdriver,
  };
};

/**
 * Extract browser name from user agent
 */
const getBrowserName = (userAgent) => {
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg"))
    return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Safari";
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  if (userAgent.includes("Trident")) return "Internet Explorer";
  return "Unknown";
};

/**
 * Extract browser version from user agent
 */
const getBrowserVersion = (userAgent, browserName) => {
  const versionRegex = {
    Chrome: /Chrome\/(\d+\.\d+)/,
    Firefox: /Firefox\/(\d+\.\d+)/,
    Safari: /Version\/(\d+\.\d+)/,
    Edge: /Edg\/(\d+\.\d+)/,
    Opera: /(?:Opera|OPR)\/(\d+\.\d+)/,
  };

  const match = userAgent.match(versionRegex[browserName]);
  return match ? match[1] : "Unknown";
};

/**
 * Get screen information
 */
const getScreenInfo = () => {
  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    orientation: screen.orientation
      ? {
          type: screen.orientation.type,
          angle: screen.orientation.angle,
        }
      : null,
    // Window dimensions
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    devicePixelRatio: window.devicePixelRatio,
  };
};

/**
 * Get timezone information
 */
const getTimezoneInfo = () => {
  const now = new Date();
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: now.getTimezoneOffset(),
    utcTime: now.toISOString(),
    localTime: now.toString(),
    timezoneName: now.toLocaleString("en", { timeZoneName: "long" }),
  };
};

/**
 * Get language and locale information
 */
const getLanguageInfo = () => {
  return {
    language: navigator.language,
    languages: navigator.languages,
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
    numberFormat: Intl.NumberFormat().resolvedOptions(),
    dateTimeFormat: Intl.DateTimeFormat().resolvedOptions(),
  };
};

/**
 * Get storage information
 */
const getStorageInfo = async () => {
  const storage = {
    localStorage: {
      available: typeof Storage !== "undefined",
      used: 0,
      quota: null,
    },
    sessionStorage: {
      available: typeof Storage !== "undefined",
      used: 0,
      quota: null,
    },
    indexedDB: {
      available: typeof indexedDB !== "undefined",
    },
    webSQL: {
      available: typeof openDatabase !== "undefined",
    },
  };

  // Calculate localStorage usage
  if (storage.localStorage.available) {
    try {
      let totalSize = 0;
      for (let key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }
      storage.localStorage.used = totalSize;
    } catch (e) {
      console.warn("Could not calculate localStorage usage:", e);
    }
  }

  // Calculate sessionStorage usage
  if (storage.sessionStorage.available) {
    try {
      let totalSize = 0;
      for (let key in sessionStorage) {
        if (Object.prototype.hasOwnProperty.call(sessionStorage, key)) {
          totalSize += sessionStorage[key].length + key.length;
        }
      }
      storage.sessionStorage.used = totalSize;
    } catch (e) {
      console.warn("Could not calculate sessionStorage usage:", e);
    }
  }

  // Get storage quota if available
  if ("storage" in navigator && "estimate" in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate();
      storage.localStorage.quota = estimate.quota;
      storage.sessionStorage.quota = estimate.quota;
    } catch (e) {
      console.warn("Could not get storage quota:", e);
    }
  }

  return storage;
};

/**
 * Get network information
 */
const getNetworkInfo = () => {
  const networkInfo = {
    connection: null,
    onLine: navigator.onLine,
    effectiveType: null,
    downlink: null,
    rtt: null,
    saveData: null,
  };

  // Get connection information if available
  if ("connection" in navigator) {
    const connection = navigator.connection;
    networkInfo.connection = {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }

  return networkInfo;
};

/**
 * Test internet speed using multiple methods
 */
const getInternetSpeed = async () => {
  const speedData = {
    downloadSpeed: null,
    uploadSpeed: null,
    latency: null,
    method: null,
    error: null,
  };

  try {
    // Method 1: Use Connection API if available
    if ("connection" in navigator) {
      const connection = navigator.connection;
      if (connection.downlink) {
        speedData.downloadSpeed = connection.downlink;
        speedData.method = "Connection API";
      }
    }

    // Method 2: Test with a small image download
    if (!speedData.downloadSpeed) {
      try {
        const testImageUrl = "https://httpbin.org/bytes/1024"; // 1KB test
        const startTime = performance.now();

        const response = await fetch(testImageUrl, {
          method: "GET",
          cache: "no-cache",
        });

        if (response.ok) {
          const endTime = performance.now();
          const duration = (endTime - startTime) / 1000; // Convert to seconds
          const bytes = 1024; // 1KB
          const speedMbps = (bytes * 8) / (duration * 1000000); // Convert to Mbps

          speedData.downloadSpeed = speedMbps;
          speedData.latency = endTime - startTime;
          speedData.method = "Image Download Test";
        }
      } catch (error) {
        console.warn("Image download speed test failed:", error);
      }
    }

    // Method 3: Test with multiple small requests
    if (!speedData.downloadSpeed) {
      try {
        const testUrls = [
          "https://httpbin.org/bytes/512",
          "https://httpbin.org/bytes/1024",
          "https://httpbin.org/bytes/2048",
        ];

        const results = [];

        for (const url of testUrls) {
          const startTime = performance.now();
          const response = await fetch(url, { cache: "no-cache" });
          const endTime = performance.now();

          if (response.ok) {
            const duration = (endTime - startTime) / 1000;
            const bytes = parseInt(url.split("/").pop());
            const speedMbps = (bytes * 8) / (duration * 1000000);
            results.push(speedMbps);
          }
        }

        if (results.length > 0) {
          // Take average of all tests
          speedData.downloadSpeed =
            results.reduce((a, b) => a + b, 0) / results.length;
          speedData.method = "Multiple Request Test";
        }
      } catch (error) {
        console.warn("Multiple request speed test failed:", error);
      }
    }

    // Method 4: Estimate based on connection type
    if (!speedData.downloadSpeed && "connection" in navigator) {
      const connection = navigator.connection;
      const speedEstimates = {
        "slow-2g": 0.05,
        "2g": 0.1,
        "3g": 0.5,
        "4g": 10,
        "5g": 100,
      };

      if (
        connection.effectiveType &&
        speedEstimates[connection.effectiveType]
      ) {
        speedData.downloadSpeed = speedEstimates[connection.effectiveType];
        speedData.method = "Connection Type Estimate";
      }
    }

    // Method 5: Test latency using ping
    try {
      const pingStart = performance.now();
      await fetch("https://httpbin.org/get", {
        method: "HEAD",
        cache: "no-cache",
      });
      const pingEnd = performance.now();
      speedData.latency = pingEnd - pingStart;
    } catch (error) {
      console.warn("Latency test failed:", error);
    }
  } catch (error) {
    speedData.error = error.message;
    console.warn("Internet speed detection failed:", error);
  }

  return speedData;
};

/**
 * Get performance information
 */
const getPerformanceInfo = () => {
  const performanceInfo = {
    timing: null,
    memory: null,
    navigation: null,
    paint: null,
    resourceTiming: [],
  };

  // Get navigation timing
  if (performance.timing) {
    const timing = performance.timing;
    performanceInfo.timing = {
      navigationStart: timing.navigationStart,
      loadEventEnd: timing.loadEventEnd,
      domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
      loadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoadedTime:
        timing.domContentLoadedEventEnd - timing.navigationStart,
    };
  }

  // Get memory information if available
  if (performance.memory) {
    performanceInfo.memory = {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
    };
  }

  // Get navigation information
  if (performance.navigation) {
    performanceInfo.navigation = {
      type: performance.navigation.type,
      redirectCount: performance.navigation.redirectCount,
    };
  }

  // Get paint timing
  const paintEntries = performance.getEntriesByType("paint");
  if (paintEntries.length > 0) {
    performanceInfo.paint = {};
    paintEntries.forEach((entry) => {
      performanceInfo.paint[entry.name] = entry.startTime;
    });
  }

  // Get resource timing (first 10 resources)
  const resourceEntries = performance.getEntriesByType("resource").slice(0, 10);
  performanceInfo.resourceTiming = resourceEntries.map((entry) => ({
    name: entry.name,
    duration: entry.duration,
    startTime: entry.startTime,
    transferSize: entry.transferSize,
    encodedBodySize: entry.encodedBodySize,
    decodedBodySize: entry.decodedBodySize,
  }));

  return performanceInfo;
};

/**
 * Get additional browser capabilities
 */
const getBrowserCapabilities = () => {
  return {
    geolocation: "geolocation" in navigator,
    notifications: "Notification" in window,
    serviceWorker: "serviceWorker" in navigator,
    webGL: !!document.createElement("canvas").getContext("webgl"),
    webGL2: !!document.createElement("canvas").getContext("webgl2"),
    webRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    webAudio: !!(window.AudioContext || window.webkitAudioContext),
    webAssembly: typeof WebAssembly !== "undefined",
    webShare: "share" in navigator,
    webPush: "PushManager" in window,
    webBluetooth: "bluetooth" in navigator,
    webUSB: "usb" in navigator,
    webNFC: "nfc" in navigator,
    webXR: "xr" in navigator,
    webLocks: "locks" in navigator,
    webScheduling: "scheduler" in window,
    webSerial: "serial" in navigator,
    webHID: "hid" in navigator,
  };
};

/**
 * Get page information
 */
const getPageInfo = () => {
  return {
    url: window.location.href,
    protocol: window.location.protocol,
    host: window.location.host,
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    referrer: document.referrer,
    title: document.title,
    characterSet: document.characterSet,
    readyState: document.readyState,
    lastModified: document.lastModified,
    domain: document.domain,
  };
};

/**
 * Get IP address using multiple methods
 */
const getIPAddress = async () => {
  const ipData = {
    publicIP: null,
    localIP: null,
    method: null,
    error: null,
  };

  try {
    // Method 1: Use a public IP service (most reliable for public IP)
    const ipServices = [
      "https://api.ipify.org?format=json",
      "https://ipapi.co/json/",
      "https://api.ip.sb/geoip",
      "https://ipinfo.io/json",
    ];

    for (const service of ipServices) {
      try {
        const response = await fetch(service, {
          method: "GET",
          timeout: 5000,
        });

        if (response.ok) {
          const data = await response.json();

          // Handle different response formats
          if (data.ip) {
            ipData.publicIP = data.ip;
            ipData.method = service;
            break;
          } else if (data.query) {
            ipData.publicIP = data.query;
            ipData.method = service;
            break;
          }
        }
      } catch (error) {
        console.warn(`IP service ${service} failed:`, error);
        continue;
      }
    }

    // Method 2: Try to get local IP using WebRTC (if available)
    if (typeof RTCPeerConnection !== "undefined") {
      try {
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pc.createDataChannel("");

        let resolvePromise;
        const promise = new Promise((resolve) => {
          resolvePromise = resolve;
        });

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            const candidate = event.candidate.candidate;
            const ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
            if (
              ipMatch &&
              !ipMatch[1].startsWith("127.") &&
              !ipMatch[1].startsWith("169.254.")
            ) {
              ipData.localIP = ipMatch[1];
              resolvePromise();
            }
          }
        };

        pc.createOffer().then((offer) => pc.setLocalDescription(offer));

        // Timeout after 3 seconds
        setTimeout(() => {
          pc.close();
          resolvePromise();
        }, 3000);

        await promise;
        pc.close();
      } catch (error) {
        console.warn("WebRTC IP detection failed:", error);
      }
    }
  } catch (error) {
    ipData.error = error.message;
    console.warn("IP address detection failed:", error);
  }

  return ipData;
};

/**
 * Main function to collect all browser data
 */
export const collectBrowserData = async () => {
  try {
    const startTime = performance.now();

    const browserData = {
      timestamp: new Date().toISOString(),
      collectionTime: 0,
      browser: getBrowserInfo(),
      screen: getScreenInfo(),
      timezone: getTimezoneInfo(),
      language: getLanguageInfo(),
      storage: await getStorageInfo(),
      network: getNetworkInfo(),
      performance: getPerformanceInfo(),
      capabilities: getBrowserCapabilities(),
      page: getPageInfo(),
      ipAddress: await getIPAddress(),
      internetSpeed: await getInternetSpeed(),
    };

    browserData.collectionTime = performance.now() - startTime;

    return browserData;
  } catch (error) {
    console.error("Error collecting browser data:", error);
    return {
      timestamp: new Date().toISOString(),
      error: error.message,
      browser: getBrowserInfo(),
      screen: getScreenInfo(),
      timezone: getTimezoneInfo(),
      language: getLanguageInfo(),
      storage: await getStorageInfo(),
      network: getNetworkInfo(),
      performance: getPerformanceInfo(),
      capabilities: getBrowserCapabilities(),
      page: getPageInfo(),
      ipAddress: await getIPAddress(),
      internetSpeed: await getInternetSpeed(),
    };
  }
};

/**
 * Send collected data to server
 */
export const sendBrowserData = async (
  browserData,
  endpoint = "/api/browser-data"
) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(browserData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending browser data:", error);
    throw error;
  }
};

/**
 * Collect and send browser data in one function
 */
export const collectAndSendBrowserData = async (
  endpoint = "/api/browser-data"
) => {
  try {
    const browserData = await collectBrowserData();
    const result = await sendBrowserData(browserData, endpoint);
    return { browserData, result };
  } catch (error) {
    console.error("Error in collectAndSendBrowserData:", error);
    throw error;
  }
};
