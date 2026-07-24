import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        height: 70,
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#1e293b",
          }}
        >
          ERP Dashboard
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {user?.name}
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: 14,
            }}
          >
            {user?.role}
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}