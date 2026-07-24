import {
  Paper,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";


import {
  Add
} from "@mui/icons-material";


import {
  useState
} from "react";


import {
  useInventory
} from "./hooks/useInventory";


import {
  useDashboard
} from "./hooks/useDashboard";


import {
  useMovements
} from "./hooks/useMovements";



import InventoryDashboard
from "./components/InventoryDashboard";


import InventoryTable
from "./components/InventoryTable";


import MovementsTable
from "./components/MovementsTable";


import AdjustStockModal
from "./components/AdjustStockModal";




export default function InventoryPage(){



const {

items,

loading,

refresh

}=useInventory();





const {

dashboard

}=useDashboard();





const {

movements

}=useMovements();





const [
open,
setOpen
]=useState(false);






return (


<Paper

elevation={3}

sx={{

p:3,

borderRadius:3

}}

>



<Typography

variant="h4"

fontWeight="bold"

mb={3}

>

Inventory

</Typography>





<InventoryDashboard

dashboard={dashboard}

/>






<Stack

direction="row"

justifyContent="space-between"

alignItems="center"

mt={4}

mb={2}

>



<Typography

variant="h5"

fontWeight="bold"

>

Stock

</Typography>





<Button

variant="contained"

startIcon={<Add/>}

onClick={()=>setOpen(true)}

>

Adjust Stock

</Button>





</Stack>






{

loading ?



<Stack

alignItems="center"

py={8}

>

<CircularProgress/>

</Stack>





:

<InventoryTable

items={items}

/>



}







<Typography

variant="h5"

fontWeight="bold"

mt={5}

mb={2}

>

Stock Movements

</Typography>





<MovementsTable

movements={movements}

/>







<AdjustStockModal


open={open}


onClose={()=>setOpen(false)}


refresh={refresh}


/>







</Paper>



);



}