function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function handleStockXLogin() {
  const state = generateState();
  // Store state in sessionStorage to validate on callback
  sessionStorage.setItem("stockx_oauth_state", state);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: "kkH2qwQ9YjlCN8lYvDs3EXLymTUnqzVr",
    redirect_uri: "https://jaymikepatel.me/equilibrium/api/stockx_auth_bounce",
    scope: "offline_access openid",
    audience: "gateway.stockx.com",
    state: state,
  });

  window.location.href = `https://accounts.stockx.com/authorize?${params.toString()}`;
}

export default function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p>Configure your preferences here.</p>

      <div className="settings-section">
        <h2>Integrations</h2>
        <button
          onClick={handleStockXLogin}
          className="stockx-login-btn"
        >
          Login with StockX
        </button>
      </div>
    </div>
  );
}
