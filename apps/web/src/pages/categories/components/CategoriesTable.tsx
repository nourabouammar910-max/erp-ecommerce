import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import {
  Button,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";

import {
  Edit,
  Delete,
} from "@mui/icons-material";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import { categoriesApi } from "../api";


interface Props {

  categories:any[];

  refresh:()=>void | Promise<void>;

  onEdit:(category:any)=>void;

}



export default function CategoriesTable({

  categories,

  refresh,

  onEdit

}:Props){



async function remove(id:number|string){


const result = await Swal.fire({

title:"Delete Category?",

text:"This action cannot be undone.",

icon:"warning",

showCancelButton:true,

confirmButtonText:"Delete",

cancelButtonText:"Cancel"

});



if(!result.isConfirmed)
return;



try{


await categoriesApi.remove(id);


toast.success(
"Category deleted successfully"
);


await refresh();



}
catch(err:any){


toast.error(
err?.response?.data?.message ??
"Delete failed"
);


}


}





const columns:GridColDef[]=[



{
field:"id",

headerName:"ID",

width:90

},



{
field:"name",

headerName:"Category",

flex:1,

minWidth:200

},



{
field:"products",

headerName:"Products",

width:150,


renderCell:(params)=>(

<Chip

label={
params.row.products?.length ?? 0
}

color="primary"

size="small"

/>

)

},



{
field:"actions",

headerName:"Actions",

width:220,

sortable:false,

filterable:false,


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

onClick={()=>
onEdit(params.row)
}

>

Edit

</Button>


</Tooltip>




<Tooltip title="Delete">

<Button

color="error"

variant="contained"

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


rows={categories}


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



sx={{

borderRadius:3

}}


/>


</div>

);


}