import {
useState
} from "react";


import {

Paper,

Stack,

Typography,

Button

}

from "@mui/material";


import {
Add
} from "@mui/icons-material";


import Loader
from "../../components/ui/Loader";


import EmptyState
from "../../components/ui/EmptyState";


import {
useInventory
} from "./hooks/useInventory";


import InventoryDashboard
from "./components/InventoryDashboard";


import InventoryTable
from "./components/InventoryTable";


import AdjustStockModal
from "./components/AdjustStockModal";


import MovementsTable
from "./components/MovementsTable";



export default function InventoryPage(){


const {

items,

loading,

refresh

}=useInventory();



const [open,setOpen]=useState(false);



const [selected,setSelected]=
useState<any>(null);




return (

<Paper

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
dashboard={{}}
/>





<Stack

direction="row"

justifyContent="space-between"

mt={4}

mb={2}

>


<Typography variant="h5">

Stock

</Typography>



<Button

variant="contained"

startIcon={<Add/>}

onClick={()=>{

setSelected(null);

setOpen(true);

}}

>

Adjust Stock

</Button>



</Stack>




{

loading ?

<Loader/>

:

items.length===0 ?

<EmptyState text="No stock found"/>

:

<InventoryTable

items={items}

onAdjust={(item)=>{

setSelected(item);

setOpen(true);

}}

/>


}




<AdjustStockModal

open={open}

item={selected}

refresh={refresh}

onClose={()=>setOpen(false)}

/>





<Typography

variant="h5"

mt={5}

mb={2}

>

Stock Movements

</Typography>



<MovementsTable

movements={[]}

/>




</Paper>


);


}