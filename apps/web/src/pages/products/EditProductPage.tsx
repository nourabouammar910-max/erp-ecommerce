import {
useNavigate,
useParams
} from "react-router-dom";

import {
useEffect,
useState
} from "react";


import ProductForm from "./components/ProductForm";

import { productsApi } from "./api";



export default function EditProductPage(){


const {id}=useParams();

const navigate=useNavigate();


const [product,setProduct]=useState<any>(null);



useEffect(()=>{


async function load(){


const res =
await productsApi.getOne(id!);


setProduct(res.data);


}


load();


},[id]);



if(!product)
return <p>Loading...</p>;



async function update(data:any){


await productsApi.update(
id!,
data
);


navigate("/products");


}



return (

<div>


<h1>
Edit Product
</h1>


<ProductForm

initial={product}

onSubmit={update}

/>


</div>

);


}