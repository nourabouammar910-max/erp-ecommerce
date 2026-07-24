import {
useEffect,
useState
} from "react";


import {

Dialog,

DialogTitle,

DialogContent,

DialogActions,

Button,

TextField,

CircularProgress,

Stack

} from "@mui/material";


import toast from "react-hot-toast";


import {
warehousesApi
} from "../api";



interface Props {

open:boolean;

onClose:()=>void;

refresh:()=>void;

warehouse?:any;

}



export default function WarehouseForm({

open,

onClose,

refresh,

warehouse

}:Props){



const [loading,setLoading]=useState(false);



const [name,setName]=useState("");



useEffect(()=>{


if(warehouse){

setName(
warehouse.name ?? ""
);


}else{


setName("");

}



},[warehouse,open]);






async function save(){



if(!name.trim()){

toast.error(
"Warehouse name is required"
);

return;

}




try{


setLoading(true);



if(warehouse){


await warehousesApi.update(

warehouse.id,

{
name:name.trim()
}

);


toast.success(
"Warehouse updated"
);



}else{


await warehousesApi.create({

name:name.trim()

});


toast.success(
"Warehouse created"
);



}




await refresh();



onClose();



}catch(err:any){



toast.error(

err?.response?.data?.message ??

"Operation failed"

);



}finally{


setLoading(false);


}



}




return (

<Dialog

open={open}

onClose={
loading ? undefined : onClose
}

fullWidth

maxWidth="sm"

>


<DialogTitle>

{
warehouse ?

"Edit Warehouse"

:

"Create Warehouse"

}

</DialogTitle>



<DialogContent>


<Stack mt={2}>


<TextField

fullWidth

label="Warehouse Name"

value={name}

onChange={(e)=>
setName(e.target.value)
}

/>


</Stack>


</DialogContent>



<DialogActions>


<Button

onClick={onClose}

disabled={loading}

>

Cancel

</Button>



<Button

variant="contained"

disabled={loading}

onClick={save}

>


{

loading ?

<CircularProgress size={22}/>

:

warehouse ?

"Update"

:

"Create"

}



</Button>



</DialogActions>


</Dialog>

);


}