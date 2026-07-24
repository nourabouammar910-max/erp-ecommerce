import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Users",
    path: "/users",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Inventory",
    path: "/inventory",
  },
  {
    name: "Warehouses",
    path: "/warehouses",
  },
  {
    name: "Suppliers",
    path: "/suppliers",
  },
  {
    name: "Purchases",
    path: "/purchases",
  },
  {
    name: "Orders",
    path: "/orders",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: 250,
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 25,
          fontSize: 24,
          fontWeight: 700,
          borderBottom: "1px solid #1e293b",
        }}
      >
        ERP System
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 15,
          gap: 8,
        }}
      >
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              color:
                location.pathname === item.path
                  ? "#fff"
                  : "#cbd5e1",
              background:
                location.pathname === item.path
                  ? "#2563eb"
                  : "transparent",
              transition: ".2s",
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}