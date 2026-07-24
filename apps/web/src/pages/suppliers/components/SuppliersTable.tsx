import {
DataGrid,
type GridColDef
} from "@mui/x-data-grid";


import {
Button,
Stack,
Tooltip
} from "@mui/material";


import {
Edit,
Delete
} from "@mui/icons-material";


import Swal from "sweetalert2";
import toast from "react-hot-toast";


import {
suppliersApi
} from "../api";



interface Props{

suppliers:any[];

refresh:()=>void|Promise<void>;

onEdit:(supplier:any)=>void;

}



export default function SuppliersTable({

suppliers,

refresh,

onEdit

}:Props){



async function remove(id:string|number){


const result =
await Swal.fire({

title:"Delete Supplier?",

text:"This action cannot be undone",

icon:"warning",

showCancelButton:true,

confirmButtonText:"Delete"

});


if(!result.isConfirmed)
return;



try{


await suppliersApi.remove(
String(id)
);


toast.success(
"Supplier deleted"
);


await refresh();


}

catch(error:any){


toast.error(
error?.response?.data?.message ??
"Delete failed"
);


}


}



const columns:GridColDef[]=[


{

field:"id",

headerName:"ID",

width:80

},


{

field:"name",

headerName:"Supplier",

flex:1

},


{

field:"phone",

headerName:"Phone",

width:150

},


{

field:"email",

headerName:"Email",

flex:1

},



{

field:"actions",

headerName:"Actions",

width:220,


sortable:false,


renderCell:(params)=>(


<Stack
direction="row"
spacing={1}
>


<Tooltip title="Edit">

<Button

size="small"

variant="contained"

startIcon={<Edit/>}

onClick={()=>onEdit(params.row)}

>

Edit

</Button>

</Tooltip>



<Tooltip title="Delete">

<Button

size="small"

color="error"

variant="contained"

startIcon={<Delete/>}

onClick={()=>
remove(params.row.id)
}

>

Delete

</Button>


</Tooltip>


</Stack>


)


}


];



return (

<div

style={{

height:600,

width:"100%"

}}

>


<DataGrid

rows={suppliers}

columns={columns}

getRowId={(row)=>row.id}

disableRowSelectionOnClick


pageSizeOptions={[
5,
10,
20,
50,
100
]}


initialState={{

pagination:{

paginationModel:{

pageSize:10

}

}

}}


/>


</div>

);


}