interface Props{
 warehouses:any[];
 onEdit:(id:string)=>void;
 onDelete:(id:string)=>void;
}


export default function WarehousesTable({
 warehouses,
 onEdit,
 onDelete
}:Props){


return (

<table
border={1}
cellPadding={10}
>


<thead>

<tr>
<th>ID</th>
<th>Name</th>
<th>Actions</th>
</tr>

</thead>


<tbody>

{
warehouses.map(w=>(

<tr key={w.id}>


<td>
{w.id}
</td>


<td>
{w.name}
</td>


<td>

<button
onClick={()=>onEdit(w.id)}
>
Edit
</button>


<button
onClick={()=>onDelete(w.id)}
>
Delete
</button>


</td>


</tr>

))
}


</tbody>


</table>

);


}