import { useNavigate } from "react-router-dom";
import { useWarehouses } from "./hooks/useWarehouses";
import { warehousesApi } from "./api";
import WarehousesTable from "./components/WarehousesTable";


export default function WarehousesPage(){

const navigate=useNavigate();


const {
 warehouses,
 loading,
 refresh
}=useWarehouses();



async function remove(id:string){

await warehousesApi.remove(id);

refresh();

}



return (

<div>


<h1>
Warehouses
</h1>


<button
onClick={()=>
navigate("/warehouses/create")
}
>
Add Warehouse
</button>


{
loading ?

<p>
Loading...
</p>

:

<WarehousesTable

warehouses={warehouses}

onEdit={
(id)=>
navigate(`/warehouses/${id}/edit`)
}

onDelete={remove}

/>

}


</div>

);

}