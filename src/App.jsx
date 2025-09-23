import React, { useState, useEffect } from "react";
import CongratsScreen from "./components/CongratsScreen";
import TrialClassPrep from "./components/TrialClassPrep";
import JetLearnBenefits from "./components/JetLearnBenefits";
import JetLearnFooter from "./components/JetLearnFooter";
import { fetchDashboardData, getUrlParams } from "./services/api";
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

        // Get URL parameters
        const { jetId, uuid } = getUrlParams();

        if (!jetId && !uuid) {
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
        const data = await fetchDashboardData(jetId, uuid);

        // Create processed data with correct field mapping
        const processedData = {
          ...data,
          student_name: data.child_name, // Map child_name to student_name for component
          parameterType: jetId ? "jet_id" : "uuid", // Track which parameter was used
          isGeneric: false, // Flag to indicate this is real data
        };

        setDashboardData(processedData);

        console.log("Dashboard data loaded:", processedData);
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
