import {useNavigate} from "react-router-dom";
import ProductForm from "./components/ProductForm";
import {productsApi} from "./api";


export default function CreateProductPage(){


const navigate=useNavigate();



async function save(data:any){

await productsApi.create(data);


navigate("/products");

}



return (

<div>

<h1>
Create Product
</h1>


<ProductForm
onSubmit={save}
/>


</div>

);


}