import { useNavigate } from "react-router-dom";
import { useCategories } from "./hooks/useCategories";
import CategoriesTable from "./components/CategoriesTable";


export default function CategoriesPage(){


const {
categories,
loading,
refresh
}=useCategories();


const navigate =
useNavigate();



return (

<div>


<div
style={{
display:"flex",
justifyContent:"space-between"
}}
>

<h1>
Categories
</h1>


<button
onClick={()=>
navigate("/categories/create")
}
>
Add Category
</button>


</div>



{
loading ?

<p>
Loading...
</p>

:

<CategoriesTable

categories={categories}

refresh={refresh}

/>

}



</div>

);

}