import {
  useEffect,
  useState
} from "react";


import {
  inventoryApi
} from "../api";



export function useMovements(){


  const [movements,setMovements]
  =
  useState<any[]>([]);



  async function refresh(){


    try{

      const res =
      await inventoryApi.getMovements();


      setMovements(
        res.data
      );


    }
    catch(error){

      console.log(error);

    }


  }



  useEffect(()=>{

    refresh();

  },[]);



  return {

    movements,

    refresh

  };


}