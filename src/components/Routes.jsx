import { useEffect, useState } from "react";
import axios from "axios";

export default function Routes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios.get("https://zero-trust-api-gateway-production.up.railway.app/actuator/gateway/routes")      .then(res => setRoutes(res.data))
      .catch(() => setRoutes([]));
  }, []);

  return (
    <div>
      <h2>Registered Routes</h2>
      {routes.length === 0 && <p>No routes found.</p>}
      {routes.map((route, i) => (
        <div key={i} style={{
          padding: 16, marginBottom: 12, borderRadius: 8,
          border: "1px solid #e5e7eb", background: "#f9fafb"
        }}>
          <div><strong>ID:</strong> {route.route_id}</div>
          <div><strong>URI:</strong> {route.uri}</div>
          <div><strong>Predicate:</strong> {route.predicate}</div>
          <div><strong>Filters:</strong>
            <ul>{route.filters.map((f, j) => <li key={j} style={{ fontSize: 13 }}>{f}</li>)}</ul>
          </div>
        </div>
      ))}
    </div>
  );
}