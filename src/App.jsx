import React, { useState, useEffect } from "react";
import CongratsScreen from "./components/CongratsScreen";
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
          throw new Error("No jet_id or uuid parameter found in URL");
        }

        // Fetch dashboard data
        const data = await fetchDashboardData(jetId, uuid);

        // Create processed data with correct field mapping
        const processedData = {
          ...data,
          student_name: data.child_name, // Map child_name to student_name for component
          parameterType: jetId ? "jet_id" : "uuid", // Track which parameter was used
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
    <div className="min-h-screen">
      <CongratsScreen dashboardData={dashboardData} />
    </div>
  );
}

export default App;
