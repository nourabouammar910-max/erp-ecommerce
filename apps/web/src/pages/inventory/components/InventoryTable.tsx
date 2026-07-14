interface Props {
  items:any[];
}


export default function InventoryTable({
  items
}:Props){


return (

<table
style={{
width:"100%",
borderCollapse:"collapse"
}}
>

<thead>

<tr>

<th>Product</th>

<th>Warehouse</th>

<th>Quantity</th>

</tr>

</thead>


<tbody>

{
items.map(item=>(

<tr key={item.id}>


<td>
{item.product.name}
</td>


<td>
{item.warehouse.name}
</td>


<td>
{item.quantity}
</td>


</tr>

))
}


</tbody>


</table>


);


}