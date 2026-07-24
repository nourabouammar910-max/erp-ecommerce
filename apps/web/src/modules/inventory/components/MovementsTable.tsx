import {
 DataGrid,
 type GridColDef
} from "@mui/x-data-grid";



interface Props {

 movements:any[];

}



export default function MovementsTable({
 movements
}:Props){



const columns:GridColDef[]=[


{
field:"product",

headerName:"Product",

flex:1,


valueGetter:(_,row)=>
row.product?.name ?? "-"

},



{
field:"warehouse",

headerName:"Warehouse",

flex:1,


valueGetter:(_,row)=>
row.warehouse?.name ?? "-"

},



{
field:"type",

headerName:"Type",

width:150

},



{
field:"quantity",

headerName:"Quantity",

width:120

},



{
field:"createdAt",

headerName:"Date",

flex:1,


valueGetter:(_,row)=>

row.createdAt
?
new Date(
row.createdAt
).toLocaleString()
:
"-"


}



];



return (

<div

style={{

height:500,

width:"100%"

}}

>


<DataGrid


rows={movements}


columns={columns}


disableRowSelectionOnClick


pageSizeOptions={[
5,
10,
20
]}


/>


</div>

);


}