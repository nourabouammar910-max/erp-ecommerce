import {
 DataGrid,
 type GridColDef
} from "@mui/x-data-grid";


interface Props{

items:any[];

}



export default function InventoryTable({

items

}:Props){


const columns:GridColDef[]=[


{

field:"product",

headerName:"Product",

flex:1,


valueGetter:(_,row)=>

row.product?.name ??
"Unknown"


},



{

field:"warehouse",

headerName:"Warehouse",

flex:1,


valueGetter:(_,row)=>

row.warehouse?.name ??
"Unknown"


},



{

field:"quantity",

headerName:"Quantity",

width:150

}


];



return(

<div

style={{

height:500,

width:"100%"

}}

>


<DataGrid


rows={items}


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