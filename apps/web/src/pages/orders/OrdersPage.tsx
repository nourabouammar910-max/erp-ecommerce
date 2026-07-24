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
useOrders
} from "./hooks/useOrders";



import OrdersTable
from "./components/OrdersTable";


import OrderForm
from "./components/OrderForm";




export default function OrdersPage(){


const {

orders,

loading,

refresh

}=useOrders();




const [
open,
setOpen
]=useState(false);




const [
selected,
setSelected
]=useState<any>(null);






return (

<Paper

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

Orders

</Typography>




<Button

variant="contained"

startIcon={<Add/>}

onClick={()=>{

setSelected(null);

setOpen(true);

}}

>

New Order

</Button>




</Stack>





{

loading ?

<Loader/>

:

orders.length===0 ?

<EmptyState

text="No orders found"

/>

:

<OrdersTable

orders={orders}

refresh={refresh}

onEdit={(order)=>{

setSelected(order);

setOpen(true);

}}

/>



}






<OrderForm

open={open}

onClose={()=>setOpen(false)}

refresh={refresh}

order={selected}

/>





</Paper>


);


}