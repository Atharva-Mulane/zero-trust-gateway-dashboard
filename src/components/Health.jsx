import { useEffect, useState } from "react";
import axios from "axios";

export default function Health() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:9090/actuator/health")
      .then(res => setHealth(res.data))
      .catch(() => setHealth({ status: "DOWN" }));
  }, []);

  if (!health) return <p>Loading...</p>;

  return (
    <div>
      <h2>Gateway Health</h2>
      <div style={{
        padding: 16, borderRadius: 8,
        background: health.status === "UP" ? "#d1fae5" : "#fee2e2",
        color: health.status === "UP" ? "#065f46" : "#991b1b",
        fontSize: 20, fontWeight: 700, marginBottom: 16
      }}>
        Status: {health.status}
      </div>
      {health.components && Object.entries(health.components).map(([key, val]) => (
        <div key={key} style={{
          padding: 12, marginBottom: 8, borderRadius: 6,
          background: val.status === "UP" ? "#f0fdf4" : "#fef9c3",
          border: "1px solid #e5e7eb"
        }}>
          <strong>{key}</strong>: {val.status}
          {val.details && <pre style={{ fontSize: 12, margin: 0 }}>{JSON.stringify(val.details, null, 2)}</pre>}
        </div>
      ))}
    </div>
  );
}