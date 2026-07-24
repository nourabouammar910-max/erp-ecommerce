import { useState } from "react";

import {
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import { Add } from "@mui/icons-material";

import SearchInput from "../../components/ui/SearchInput";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

import { useWarehouses } from "./hooks/useWarehouses";

import WarehousesTable from "./components/WarehousesTable";
import WarehouseForm from "./components/WarehouseForm";


export default function WarehousesPage() {

  const {
    warehouses,
    loading,
    refresh,
  } = useWarehouses();


  const [open,setOpen] = useState(false);


  const [
    selectedWarehouse,
    setSelectedWarehouse
  ] = useState<any>(null);


  const [search,setSearch] = useState("");



  const filteredWarehouses =
    warehouses.filter((warehouse:any)=>{

      const keyword =
        search.toLowerCase();


      return (
        warehouse.name
        ?.toLowerCase()
        .includes(keyword)
      );

    });



  return (

    <Paper
      elevation={3}
      sx={{
        p:3,
        borderRadius:3
      }}
    >


      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Warehouses
        </Typography>



        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={()=>{

            setSelectedWarehouse(null);

            setOpen(true);

          }}
        >

          Add Warehouse

        </Button>


      </Stack>



      <Stack mb={3}>

        <SearchInput

          value={search}

          onChange={setSearch}

          placeholder="Search warehouses..."

        />

      </Stack>




      {
        loading ?

        <Loader/>

        :

        filteredWarehouses.length === 0 ?

        <EmptyState
          text="No warehouses found"
        />

        :

        <WarehousesTable

          warehouses={filteredWarehouses}

          refresh={refresh}

          onEdit={(warehouse)=>{

            setSelectedWarehouse(warehouse);

            setOpen(true);

          }}

        />

      }



      <WarehouseForm

        open={open}

        onClose={()=>setOpen(false)}

        refresh={refresh}

        warehouse={selectedWarehouse}

      />



    </Paper>

  );

}