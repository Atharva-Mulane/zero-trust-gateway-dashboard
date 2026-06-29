import { useEffect, useState } from "react";
import axios from "axios";

const METRICS = [
  "http.server.requests",
  "gateway.requests",
  "redis.commands.duration"
];

export default function Metrics() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    METRICS.forEach(m => {
      axios.get(`http://localhost:9090/actuator/metrics/${m}`)
        .then(res => setMetrics(prev => ({ ...prev, [m]: res.data })))
        .catch(() => setMetrics(prev => ({ ...prev, [m]: null })));
    });
  }, []);

  return (
    <div>
      <h2>Metrics</h2>
      {METRICS.map(m => (
        <div key={m} style={{
          padding: 16, marginBottom: 12, borderRadius: 8,
          border: "1px solid #e5e7eb", background: "#f9fafb"
        }}>
          <strong>{m}</strong>
          {metrics[m] ? (
            <pre style={{ fontSize: 12 }}>{JSON.stringify(metrics[m], null, 2)}</pre>
          ) : <p style={{ color: "#999" }}>Not available</p>}
        </div>
      ))}
    </div>
  );
}