import {
  useEffect,
  useState
} from "react";


import {
  inventoryApi
} from "../api";



export function useMovements(){


  const [
    movements,
    setMovements
  ] =
  useState<any[]>([]);



  const [
    loading,
    setLoading
  ] =
  useState(false);




  async function refresh(){


    try {


      setLoading(true);



      const res =
      await inventoryApi.getMovements();



      setMovements(
        res.data
      );



    }
    catch(error){


      console.log(
        "Movements Error",
        error
      );


    }
    finally{

      setLoading(false);

    }


  }




  useEffect(()=>{


    refresh();


  },[]);




  return {


    movements,


    loading,


    refresh


  };


}