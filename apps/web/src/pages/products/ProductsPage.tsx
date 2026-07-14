import {useState} from "react";

import {useProducts} from "./hooks/useProducts";
import ProductsTable from "./components/ProductsTable";

import {useNavigate} from "react-router-dom";


export default function ProductsPage(){


const {
products,
loading,
refresh
}=useProducts();


const navigate = useNavigate();



return (

<div>


<div
style={{
display:"flex",
justifyContent:"space-between",
marginBottom:20
}}
>

<h1>
Products
</h1>


<button
onClick={()=>navigate("/products/create")}
>
Add Product
</button>


</div>



{
loading

?

<p>
Loading...
</p>

:

<ProductsTable
products={products}
refresh={refresh}
/>

}


</div>

);

}