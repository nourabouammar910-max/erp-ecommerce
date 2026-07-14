import {
  Outlet,
  Link
} from "react-router-dom";


export default function DashboardLayout() {


  return (

    <div
      style={{
        display:"flex",
        minHeight:"100vh",
      }}
    >


      <aside
        style={{
          width:220,
          padding:20,
          borderRight:"1px solid #ddd",
        }}
      >


        <h2>
          ERP
        </h2>



        <nav
          style={{
            display:"flex",
            flexDirection:"column",
            gap:15,
          }}
        >


          <Link to="/dashboard">
            Dashboard
          </Link>



          <Link to="/users">
            Users
          </Link>



          <Link to="/products">
            Products
          </Link>



          <Link to="/categories">
            Categories
          </Link>



          <Link to="/inventory">
            Inventory
          </Link>



          <Link to="/warehouses">
            Warehouses
          </Link>



          <Link to="/suppliers">
            Suppliers
          </Link>



          <Link to="/orders">
            Orders
          </Link>



          <Link to="/purchases">
            Purchases
          </Link>


        </nav>


      </aside>





      <main
        style={{
          flex:1,
          padding:30,
        }}
      >

        <Outlet />

      </main>



    </div>

  );

}