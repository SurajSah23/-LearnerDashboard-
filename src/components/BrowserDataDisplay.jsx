import React, { useState } from "react";
import { collectBrowserData } from "../services/browserDataCollector";

/**
 * Component to display collected browser data
 * This is for testing and demonstration purposes
 */
const BrowserDataDisplay = ({ browserData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectedData, setCollectedData] = useState(null);

  const handleCollectData = async () => {
    setIsCollecting(true);
    try {
      const data = await collectBrowserData();
      setCollectedData(data);
    } catch (error) {
      console.error("Error collecting browser data:", error);
    } finally {
      setIsCollecting(false);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const data = collectedData || browserData;

  if (!data) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Browser Data Collection</h3>
        <button
          onClick={handleCollectData}
          disabled={isCollecting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isCollecting ? "Collecting..." : "Collect Browser Data"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Browser Data Collection</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-3 rounded">
          <h4 className="font-semibold text-sm text-gray-600">Browser</h4>
          <p className="text-lg">
            {data.browser?.browserName} {data.browser?.browserVersion}
          </p>
        </div>
        <div className="bg-white p-3 rounded">
          <h4 className="font-semibold text-sm text-gray-600">Screen</h4>
          <p className="text-lg">
            {data.screen?.width} × {data.screen?.height}
          </p>
        </div>
        <div className="bg-white p-3 rounded">
          <h4 className="font-semibold text-sm text-gray-600">Timezone</h4>
          <p className="text-lg">{data.timezone?.timezone}</p>
        </div>
        <div className="bg-white p-3 rounded">
          <h4 className="font-semibold text-sm text-gray-600">Language</h4>
          <p className="text-lg">{data.language?.language}</p>
        </div>
        <div className="bg-white p-3 rounded">
          <h4 className="font-semibold text-sm text-gray-600">IP Address</h4>
          <p className="text-lg">
            {data.ipAddress?.publicIP || data.ipAddress?.localIP || "Unknown"}
          </p>
        </div>
        <div className="bg-white p-3 rounded">
          <h4 className="font-semibold text-sm text-gray-600">
            Internet Speed
          </h4>
          <p className="text-lg">
            {data.internetSpeed?.downloadSpeed
              ? `${data.internetSpeed.downloadSpeed.toFixed(1)} Mbps`
              : "Unknown"}
          </p>
        </div>
      </div>

      {/* Storage Info */}
      <div className="bg-white p-3 rounded mb-4">
        <h4 className="font-semibold text-sm text-gray-600 mb-2">
          Storage Usage
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Local Storage:</span>
            <span className="ml-2">
              {formatBytes(data.storage?.localStorage?.used || 0)}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Session Storage:</span>
            <span className="ml-2">
              {formatBytes(data.storage?.sessionStorage?.used || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      {data.performance?.timing && (
        <div className="bg-white p-3 rounded mb-4">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">
            Performance
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Load Time:</span>
              <span className="ml-2">{data.performance.timing.loadTime}ms</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">DOM Ready:</span>
              <span className="ml-2">
                {data.performance.timing.domContentLoadedTime}ms
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Network Info */}
      {data.network?.connection && (
        <div className="bg-white p-3 rounded mb-4">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">Network</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Connection Type:</span>
              <span className="ml-2">
                {data.network.connection.effectiveType}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Downlink:</span>
              <span className="ml-2">
                {data.network.connection.downlink} Mbps
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Internet Speed Info */}
      {data.internetSpeed && (
        <div className="bg-white p-3 rounded mb-4">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">
            Internet Speed
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Download Speed:</span>
              <span className="ml-2 font-mono text-sm">
                {data.internetSpeed.downloadSpeed
                  ? `${data.internetSpeed.downloadSpeed.toFixed(2)} Mbps`
                  : "Not available"}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Latency:</span>
              <span className="ml-2 font-mono text-sm">
                {data.internetSpeed.latency
                  ? `${data.internetSpeed.latency.toFixed(0)}ms`
                  : "Not available"}
              </span>
            </div>
            {data.internetSpeed.method && (
              <div className="md:col-span-2">
                <span className="text-sm text-gray-500">Test Method:</span>
                <span className="ml-2 text-sm">
                  {data.internetSpeed.method}
                </span>
              </div>
            )}
            {data.internetSpeed.error && (
              <div className="md:col-span-2">
                <span className="text-sm text-red-500">Error:</span>
                <span className="ml-2 text-sm text-red-500">
                  {data.internetSpeed.error}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* IP Address Info */}
      {data.ipAddress && (
        <div className="bg-white p-3 rounded mb-4">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">
            IP Address
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Public IP:</span>
              <span className="ml-2 font-mono text-sm">
                {data.ipAddress.publicIP || "Not available"}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Local IP:</span>
              <span className="ml-2 font-mono text-sm">
                {data.ipAddress.localIP || "Not available"}
              </span>
            </div>
            {data.ipAddress.method && (
              <div className="md:col-span-2">
                <span className="text-sm text-gray-500">Detection Method:</span>
                <span className="ml-2 text-sm">{data.ipAddress.method}</span>
              </div>
            )}
            {data.ipAddress.error && (
              <div className="md:col-span-2">
                <span className="text-sm text-red-500">Error:</span>
                <span className="ml-2 text-sm text-red-500">
                  {data.ipAddress.error}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detailed Data */}
      {isExpanded && (
        <div className="bg-white p-4 rounded">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">
            Detailed Data
          </h4>
          <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleCollectData}
          disabled={isCollecting}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 mr-2"
        >
          {isCollecting ? "Collecting..." : "Refresh Data"}
        </button>
        <span className="text-sm text-gray-500">
          Collection Time: {data.collectionTime?.toFixed(2)}ms
        </span>
      </div>
    </div>
  );
};

export default BrowserDataDisplay;
