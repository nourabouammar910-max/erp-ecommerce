import { useNavigate } from "react-router-dom";
import WarehouseForm from "./components/WarehouseForm";
import { warehousesApi } from "./api";


export default function CreateWarehousePage(){

  const navigate = useNavigate();


  async function submit(data:any){

    try{

      await warehousesApi.create(data);

      navigate("/warehouses");

    }catch(error){

      console.log(
        "CREATE WAREHOUSE ERROR",
        error
      );

    }

  }



  return (

    <div>

      <h1>
        Create Warehouse
      </h1>


      <WarehouseForm
        onSubmit={submit}
      />


    </div>

  );

}