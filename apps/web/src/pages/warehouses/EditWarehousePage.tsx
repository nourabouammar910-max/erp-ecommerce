import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { warehousesApi } from "./api";
import WarehouseForm from "./components/WarehouseForm";


export default function EditWarehousePage(){

const {id}=useParams();

const navigate=useNavigate();


const [warehouse,setWarehouse]=useState<any>(null);



useEffect(()=>{

load();

},[]);



async function load(){

const res=
await warehousesApi.getOne(id!);

setWarehouse(res.data);

}



async function save(data:any){

await warehousesApi.update(
id!,
data
);


navigate("/warehouses");

}



if(!warehouse)
return <p>Loading...</p>



return (

<div>

<h1>
Edit Warehouse
</h1>


<WarehouseForm

initial={warehouse}

onSubmit={save}

/>


</div>

);


}