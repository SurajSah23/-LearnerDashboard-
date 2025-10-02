import React, { useState, useEffect } from "react";
import CongratsScreen from "./components/CongratsScreen";
import TrialClassPrep from "./components/TrialClassPrep";
import JetLearnBenefits from "./components/JetLearnBenefits";
import JetLearnFooter from "./components/JetLearnFooter";
import {
  fetchDashboardData,
  getUrlParams,
  sendBrowserDataToBackend,
} from "./services/api";
import { collectBrowserData } from "./services/browserDataCollector";
// import SignupScreen from './components/SignupScreen';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Collect browser data first
        console.log("🔍 Collecting comprehensive browser data...");
        const collectedBrowserData = await collectBrowserData();

        // Log all collected data in a structured format
        console.log("📊 ===== BROWSER DATA COLLECTION RESULTS =====");
        console.log(
          "⏱️ Collection Time:",
          collectedBrowserData.collectionTime?.toFixed(2) + "ms"
        );
        console.log("🕐 Timestamp:", collectedBrowserData.timestamp);

        console.log("\n🌐 BROWSER INFORMATION:");
        console.log(
          "  Browser:",
          collectedBrowserData.browser?.browserName,
          collectedBrowserData.browser?.browserVersion
        );
        console.log("  Platform:", collectedBrowserData.browser?.platform);
        console.log("  User Agent:", collectedBrowserData.browser?.userAgent);
        console.log("  Online:", collectedBrowserData.browser?.onLine);
        console.log("  Language:", collectedBrowserData.browser?.language);
        console.log("  Languages:", collectedBrowserData.browser?.languages);
        console.log(
          "  Hardware Concurrency:",
          collectedBrowserData.browser?.hardwareConcurrency
        );
        console.log(
          "  Max Touch Points:",
          collectedBrowserData.browser?.maxTouchPoints
        );

        console.log("\n📱 SCREEN INFORMATION:");
        console.log(
          "  Screen Size:",
          collectedBrowserData.screen?.width +
            "x" +
            collectedBrowserData.screen?.height
        );
        console.log(
          "  Available Size:",
          collectedBrowserData.screen?.availWidth +
            "x" +
            collectedBrowserData.screen?.availHeight
        );
        console.log("  Color Depth:", collectedBrowserData.screen?.colorDepth);
        console.log("  Pixel Depth:", collectedBrowserData.screen?.pixelDepth);
        console.log(
          "  Device Pixel Ratio:",
          collectedBrowserData.screen?.devicePixelRatio
        );
        console.log(
          "  Window Size:",
          collectedBrowserData.screen?.innerWidth +
            "x" +
            collectedBrowserData.screen?.innerHeight
        );

        console.log("\n🌍 TIMEZONE & LOCATION:");
        console.log("  Timezone:", collectedBrowserData.timezone?.timezone);
        console.log(
          "  Timezone Offset:",
          collectedBrowserData.timezone?.timezoneOffset + " minutes"
        );
        console.log("  UTC Time:", collectedBrowserData.timezone?.utcTime);
        console.log("  Local Time:", collectedBrowserData.timezone?.localTime);

        console.log("\n🗣️ LANGUAGE & LOCALE:");
        console.log(
          "  Browser Language:",
          collectedBrowserData.language?.language
        );
        console.log(
          "  Supported Languages:",
          collectedBrowserData.language?.languages
        );
        console.log("  Locale:", collectedBrowserData.language?.locale);

        console.log("\n💾 STORAGE INFORMATION:");
        console.log(
          "  LocalStorage Available:",
          collectedBrowserData.storage?.localStorage?.available
        );
        console.log(
          "  LocalStorage Used:",
          collectedBrowserData.storage?.localStorage?.used + " bytes"
        );
        console.log(
          "  SessionStorage Available:",
          collectedBrowserData.storage?.sessionStorage?.available
        );
        console.log(
          "  SessionStorage Used:",
          collectedBrowserData.storage?.sessionStorage?.used + " bytes"
        );
        console.log(
          "  IndexedDB Available:",
          collectedBrowserData.storage?.indexedDB?.available
        );
        console.log(
          "  Storage Quota:",
          collectedBrowserData.storage?.localStorage?.quota
            ? (
                collectedBrowserData.storage.localStorage.quota /
                1024 /
                1024
              ).toFixed(2) + " MB"
            : "Unknown"
        );

        console.log("\n🌐 NETWORK INFORMATION:");
        console.log("  Online:", collectedBrowserData.network?.onLine);
        if (collectedBrowserData.network?.connection) {
          console.log(
            "  Connection Type:",
            collectedBrowserData.network.connection.effectiveType
          );
          console.log(
            "  Downlink:",
            collectedBrowserData.network.connection.downlink + " Mbps"
          );
          console.log(
            "  RTT:",
            collectedBrowserData.network.connection.rtt + " ms"
          );
          console.log(
            "  Save Data:",
            collectedBrowserData.network.connection.saveData
          );
        }

        console.log("\n⚡ INTERNET SPEED TEST:");
        if (collectedBrowserData.internetSpeed) {
          console.log(
            "  Download Speed:",
            collectedBrowserData.internetSpeed.downloadSpeed
              ? collectedBrowserData.internetSpeed.downloadSpeed.toFixed(2) +
                  " Mbps"
              : "Not available"
          );
          console.log(
            "  Latency:",
            collectedBrowserData.internetSpeed.latency
              ? collectedBrowserData.internetSpeed.latency.toFixed(0) + " ms"
              : "Not available"
          );
          console.log(
            "  Test Method:",
            collectedBrowserData.internetSpeed.method || "Not available"
          );
          if (collectedBrowserData.internetSpeed.error) {
            console.log("  Error:", collectedBrowserData.internetSpeed.error);
          }
        }

        console.log("\n🌍 IP ADDRESS INFORMATION:");
        if (collectedBrowserData.ipAddress) {
          console.log(
            "  Public IP:",
            collectedBrowserData.ipAddress.publicIP || "Not available"
          );
          console.log(
            "  Local IP:",
            collectedBrowserData.ipAddress.localIP || "Not available"
          );
          console.log(
            "  Detection Method:",
            collectedBrowserData.ipAddress.method || "Not available"
          );
          if (collectedBrowserData.ipAddress.error) {
            console.log("  Error:", collectedBrowserData.ipAddress.error);
          }
        }

        console.log("\n📄 PAGE INFORMATION:");
        console.log("  URL:", collectedBrowserData.page?.url);
        console.log("  Protocol:", collectedBrowserData.page?.protocol);
        console.log("  Host:", collectedBrowserData.page?.host);
        console.log("  Pathname:", collectedBrowserData.page?.pathname);
        console.log("  Referrer:", collectedBrowserData.page?.referrer);
        console.log("  Title:", collectedBrowserData.page?.title);
        console.log(
          "  Character Set:",
          collectedBrowserData.page?.characterSet
        );
        console.log("  Domain:", collectedBrowserData.page?.domain);

        console.log("\n📊 COMPLETE RAW DATA:");
        console.log(collectedBrowserData);
        console.log("📊 ===== END BROWSER DATA COLLECTION =====");

        // Get URL parameters
        const { jetId, type } = getUrlParams();

        // Send browser data to backend (fire and forget)
        try {
          await sendBrowserDataToBackend(collectedBrowserData, jetId, type);
          console.log("✅ Browser data sent to backend successfully");
        } catch (error) {
          console.warn("❌ Failed to send browser data to backend:", error);
          // Don't fail the entire app if browser data sending fails
        }

        if (!jetId && !type) {
          // No parameters provided - show generic welcome message
          const genericData = {
            student_name: "Student", // Generic name
            parameterType: "none", // No specific parameter type
            start_time_cx: null, // No specific date/time
            zoom_link: null, // No zoom link
            isGeneric: true, // Flag to indicate this is a generic message
          };
          setDashboardData(genericData);
          return;
        }
        // Fetch dashboard data
        const data = await fetchDashboardData(jetId, type);

        // Create processed data with correct field mapping
        const processedData = {
          ...data,
          student_name: data.child_name, // Map child_name to student_name for component
          parameterType: jetId ? "jet_id" : "uuid", // Track which parameter was used
          isGeneric: data.isGeneric !== undefined ? data.isGeneric : false, // Preserve isGeneric flag from API or set to false
        };

        setDashboardData(processedData);

        console.log("Dashboard data loaded:", processedData);

        // Log if error status was returned
        if (data.status === "error") {
          console.warn(
            "API returned error, displaying basic page:",
            data.message
          );
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please check that the URL contains either a{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">jet_id</code> or{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">uuid</code>{" "}
            parameter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <CongratsScreen dashboardData={dashboardData} />
      </div>
      <TrialClassPrep />
      <JetLearnBenefits />
      <JetLearnFooter />
    </div>
  );
}

export default App;
