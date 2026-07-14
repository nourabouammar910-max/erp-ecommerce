import { useState } from "react";

import {
  useInventory
} from "./hooks/useInventory";


import {
  useDashboard
} from "./hooks/useDashboard";


import InventoryTable from "./components/InventoryTable";

import AdjustStockModal from "./components/AdjustStockModal";

import InventoryDashboard from "./components/InventoryDashboard";

import MovementsTable from "./components/MovementsTable";

import {
  useMovements
} from "./hooks/useMovements";



export default function InventoryPage() {


  const {
    items,
    loading,
    refresh
  } = useInventory();



  const {
    dashboard
  } = useDashboard();



  const {
    movements
  } = useMovements();



  const [open,setOpen] =
    useState(false);



  return (

    <div>


      <h1>
        Inventory
      </h1>



      <InventoryDashboard
        dashboard={dashboard}
      />



      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          marginBottom:20,
        }}
      >


        <h2>
          Stock
        </h2>



        <button
          onClick={()=>
            setOpen(true)
          }
        >
          Adjust Stock
        </button>


      </div>





      {
        loading ?

        <p>
          Loading...
        </p>

        :

        <InventoryTable
          items={items}
        />

      }






      <h2
        style={{
          marginTop:40
        }}
      >
        Stock Movements
      </h2>



      <MovementsTable
        movements={movements}
      />






      {
        open &&

        <AdjustStockModal

          refresh={refresh}

          onClose={()=>
            setOpen(false)
          }

        />

      }



    </div>

  );

}