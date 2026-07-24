import {
useState
} from "react";


import {

Paper,

Stack,

Typography,

Button

} from "@mui/material";


import {
Add
} from "@mui/icons-material";


import SearchInput from "../../components/ui/SearchInput";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";


import {
useSuppliers
} from "./hooks/useSuppliers";


import SuppliersTable from "./components/SuppliersTable";
import SupplierForm from "./components/SupplierForm";



export default function SuppliersPage(){


const {

suppliers,

loading,

refresh

}=useSuppliers();



const [open,setOpen]=
useState(false);



const [selectedSupplier,setSelectedSupplier]=
useState<any>(null);



const [search,setSearch]=
useState("");





const filteredSuppliers =
suppliers.filter((supplier:any)=>{


const key =
search.toLowerCase();



return (

supplier.name
?.toLowerCase()
.includes(key)

||

supplier.email
?.toLowerCase()
.includes(key)

||

supplier.phone
?.includes(search)

);


});




return(

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

Suppliers

</Typography>



<Button

variant="contained"

startIcon={<Add/>}

onClick={()=>{

setSelectedSupplier(null);

setOpen(true);

}}

>

Add Supplier

</Button>



</Stack>




<SearchInput

value={search}

onChange={setSearch}

placeholder="Search suppliers..."

 />





{

loading ?

<Loader/>


:

filteredSuppliers.length===0 ?

<EmptyState

text="No suppliers found"

/>


:


<SuppliersTable


suppliers={filteredSuppliers}


refresh={refresh}


onEdit={(supplier)=>{


setSelectedSupplier(supplier);


setOpen(true);


}}


/>


}





<SupplierForm

open={open}

onClose={()=>setOpen(false)}

refresh={refresh}

supplier={selectedSupplier}

/>



</Paper>


);


}