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
  warehousesApi
} from "../api";



interface Props {

  warehouses:any[];

  refresh:()=>void|Promise<void>;

  onEdit:(warehouse:any)=>void;

}



export default function WarehousesTable({

warehouses,

refresh,

onEdit

}:Props){



async function remove(id:string|number){


const result =
await Swal.fire({

title:"Delete Warehouse?",

text:"This action cannot be undone",

icon:"warning",

showCancelButton:true,

confirmButtonText:"Delete"

});


if(!result.isConfirmed)
return;



try{


await warehousesApi.remove(
String(id)
);


toast.success(
"Warehouse deleted"
);


await refresh();


}catch(error:any){


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

headerName:"Warehouse",

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

variant="contained"

size="small"

startIcon={<Edit/>}

onClick={()=>onEdit(params.row)}

>

Edit

</Button>

</Tooltip>



<Tooltip title="Delete">

<Button

variant="contained"

color="error"

size="small"

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


rows={warehouses}


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