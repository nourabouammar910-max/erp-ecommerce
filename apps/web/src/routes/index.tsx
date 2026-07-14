import { 
  createBrowserRouter, 
  useRouteError 
} from "react-router-dom";


import LoginPage from "../pages/auth/LoginPage";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";


// Dashboard
import DashboardPage from "../pages/dashboard/DashboardPage";


// Users
import UsersPage from "../pages/users/UsersPage";
import CreateUserPage from "../pages/users/CreateUserPage";
import EditUserPage from "../pages/users/EditUserPage";


// Products
import ProductsPage from "../pages/products/ProductsPage";
import CreateProductPage from "../pages/products/CreateProductPage";
import EditProductPage from "../pages/products/EditProductPage";


// Categories
import CategoriesPage from "../pages/categories/CategoriesPage";
import CreateCategoryPage from "../pages/categories/CreateCategoryPage";
import EditCategoryPage from "../pages/categories/EditCategoryPage";


// Inventory
import InventoryPage from "../pages/inventory/InventoryPage";


// Warehouses
import WarehousesPage from "../pages/warehouses/WarehousesPage";
import CreateWarehousePage from "../pages/warehouses/CreateWarehousePage";
import EditWarehousePage from "../pages/warehouses/EditWarehousePage";

// Suppliers
import SuppliersPage from "../pages/suppliers/SuppliersPage";
import CreateSupplierPage from "../pages/suppliers/CreateSupplierPage";
import EditSupplierPage from "../pages/suppliers/EditSupplierPage";

// Orders
import OrdersPage from "../pages/orders/OrdersPage";
import CreateOrderPage from "../pages/orders/CreateOrderPage";
import CreateOrder from "../pages/orders/CreateOrder";

// Purchases
import PurchasesPage from "../pages/purchases/PurchasesPage";




function ErrorPage() {

  const error = useRouteError() as any;


  return (

    <div
      style={{
        padding:40
      }}
    >

      <h1>
        Route Error
      </h1>


      <pre>
        {
          error?.message ||
          JSON.stringify(
            error,
            null,
            2
          )
        }
      </pre>


    </div>

  );

}



export const router = createBrowserRouter([


  // LOGIN
  {
    path:"/",
    element:<LoginPage />,
    errorElement:<ErrorPage />,
  },



  // DASHBOARD LAYOUT
  {
    element:

      <ProtectedRoute>

        <DashboardLayout />

      </ProtectedRoute>
    ,


    errorElement:<ErrorPage />,



    children:[



      // =================
      // Dashboard
      // =================

      {
        path:"dashboard",
        element:<DashboardPage />,
      },




      // =================
      // Users
      // =================

      {
        path:"users",
        element:<UsersPage />,
      },


      {
        path:"users/create",
        element:<CreateUserPage />,
      },


      {
        path:"users/:id/edit",
        element:<EditUserPage />,
      },






      // =================
      // Products
      // =================


      {
        path:"products",
        element:<ProductsPage />,
      },


      {
        path:"products/create",
        element:<CreateProductPage />,
      },


      {
        path:"products/:id/edit",
        element:<EditProductPage />,
      },







      // =================
      // Categories
      // =================


      {
        path:"categories",
        element:<CategoriesPage />,
      },


      {
        path:"categories/create",
        element:<CreateCategoryPage />,
      },


      {
        path:"categories/:id/edit",
        element:<EditCategoryPage />,
      },






      // =================
      // Inventory
      // =================


      {
        path:"inventory",
        element:<InventoryPage />,
      },






      // =================
      // Warehouses
      // =================


      {
        path:"warehouses",
        element:<WarehousesPage />,
      },


      {
        path:"warehouses/create",
        element:<CreateWarehousePage />,
      },


      {
        path:"warehouses/:id/edit",
        element:<EditWarehousePage />,
      },


// =================
// Suppliers
// =================

{
  path: "suppliers",
  element: <SuppliersPage />,
},

{
  path: "suppliers/create",
  element: <CreateSupplierPage />,
},

{
  path: "suppliers/:id/edit",
  element: <EditSupplierPage />,
},




   // =================
// Orders
// =================

{
  path:"orders",
  element:<OrdersPage />,
},

{
  path:"orders/create",
  element:<CreateOrderPage />,
},
{
  path:"orders/create",
  element:<CreateOrder />,
},






      // =================
      // Purchases
      // =================


      {
        path:"purchases",
        element:<PurchasesPage />,
      },


    ],


  },


]);