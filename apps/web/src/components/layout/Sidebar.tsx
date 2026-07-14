import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#1e293b",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>ERP</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "30px",
        }}
      >
       <Link to="/dashboard">Dashboard</Link>
<Link to="/dashboard/users">Users</Link>
<Link to="/dashboard/products">Products</Link>
<Link to="/dashboard/categories">Categories</Link>
<Link to="/dashboard/inventory">Inventory</Link>
<Link to="/dashboard/purchases">Purchases</Link>
<Link to="/dashboard/orders">Orders</Link>
      </nav>
    </aside>
  );
}