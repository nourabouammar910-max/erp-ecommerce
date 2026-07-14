import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>ERP Dashboard</h2>

      <div>
        <span>
          {user?.name} ({user?.role})
        </span>

        <button
          style={{ marginLeft: 15 }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}