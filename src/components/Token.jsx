import { useState } from "react";
import axios from "axios";

export default function Token() {
  const [clientSecret, setClientSecret] = useState("");
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const getToken = async () => {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("client_id", "gateway-client");
      params.append("client_secret", clientSecret);
      params.append("username", "testuser");
      params.append("password", "testpass");

      const res = await axios.post(
        "http://localhost:8080/realms/zerotrust/protocol/openid-connect/token",
        params
      );
      setToken(res.data.access_token);
      setError(null);
    } catch (e) {
      setError("Failed to get token. Check your client secret.");
    }
  };

  const testGateway = async () => {
    try {
      const res = await axios.get("https://zero-trust-api-gateway-production.up.railway.app/api/test", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResponse(res.data);
      setError(null);
    } catch (e) {
      setError("Request failed: " + (e.response?.status || e.message));
    }
  };

  return (
    <div>
      <h2>Test Gateway</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Client Secret:</label><br />
        <input
          value={clientSecret}
          onChange={e => setClientSecret(e.target.value)}
          style={{ padding: 8, width: 400, borderRadius: 6, border: "1px solid #ccc", marginTop: 4 }}
          placeholder="Paste your Keycloak client secret"
        />
      </div>
      <button onClick={getToken} style={{
        padding: "8px 20px", borderRadius: 6, background: "#4f46e5",
        color: "white", border: "none", cursor: "pointer", marginRight: 8
      }}>
        Get Token
      </button>
      {token && (
        <button onClick={testGateway} style={{
          padding: "8px 20px", borderRadius: 6, background: "#059669",
          color: "white", border: "none", cursor: "pointer"
        }}>
          Test /api/test
        </button>
      )}
      {token && (
        <div style={{ marginTop: 12, padding: 12, background: "#f0fdf4", borderRadius: 6 }}>
          <strong>Token received</strong>
          <p style={{ fontSize: 11, wordBreak: "break-all" }}>{token.substring(0, 80)}...</p>
        </div>
      )}
      {response && (
        <div style={{ marginTop: 12, padding: 12, background: "#eff6ff", borderRadius: 6 }}>
          <strong>Response:</strong> {response}
        </div>
      )}
      {error && (
        <div style={{ marginTop: 12, padding: 12, background: "#fee2e2", borderRadius: 6, color: "#991b1b" }}>
          {error}
        </div>
      )}
    </div>
  );
}