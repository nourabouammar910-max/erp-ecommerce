import {useNavigate} from "react-router-dom";
import {productsApi} from "../api";


interface Props{

products:any[];

refresh:()=>void;

}


export default function ProductsTable({
products,
refresh
}:Props){


const navigate=useNavigate();



async function remove(id:string){

if(!confirm("Delete product?"))
return;


await productsApi.remove(id);

refresh();

}



return (

<table
style={{
width:"100%",
borderCollapse:"collapse"
}}
>


<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Price</th>
<th>Category</th>
<th>Actions</th>

</tr>

</thead>



<tbody>


{
products.map(product=>(


<tr key={product.id}>


<td>
{product.id}
</td>


<td>
{product.name}
</td>


<td>
{product.price}
</td>


<td>
{product.category?.name}
</td>


<td>


<button
onClick={()=>
navigate(
`/products/${product.id}/edit`
)
}
>
Edit
</button>


<button
onClick={()=>
remove(product.id)
}
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