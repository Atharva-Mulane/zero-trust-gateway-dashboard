import { useState } from "react";
import Health from "./components/Health";
import Routes from "./components/Routes";
import Metrics from "./components/Metrics";
import Token from "./components/Token";

export default function App() {
  const [activeTab, setActiveTab] = useState("health");

  const tabs = ["health", "routes", "metrics", "token"];

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ color: "#1a1a2e" }}>Zero-Trust API Gateway Dashboard</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              background: activeTab === tab ? "#4f46e5" : "#e5e7eb",
              color: activeTab === tab ? "white" : "#111",
              fontWeight: 600,
              textTransform: "capitalize"
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "health" && <Health />}
        {activeTab === "routes" && <Routes />}
        {activeTab === "metrics" && <Metrics />}
        {activeTab === "token" && <Token />}
      </div>
    </div>
  );
}