import { useNavigate } from "react-router-dom";


export default function CategoriesTable({
categories,
refresh
}:any){


const navigate =
useNavigate();



async function remove(id:number){


await fetch(
`http://localhost:3000/categories/${id}`,
{
method:"DELETE"
}
);


refresh();

}



return (

<table
style={{
width:"100%"
}}
>


<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Products</th>

<th>Actions</th>

</tr>

</thead>



<tbody>


{
categories.map((cat:any)=>(

<tr key={cat.id}>


<td>
{cat.id}
</td>


<td>
{cat.name}
</td>


<td>
{cat.products?.length || 0}
</td>


<td>


<button
onClick={()=>
navigate(
`/categories/${cat.id}/edit`
)
}
>
Edit
</button>



<button
onClick={()=>
remove(cat.id)
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