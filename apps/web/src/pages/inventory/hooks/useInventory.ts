import {
  useEffect,
  useState
} from "react";

import {
  inventoryApi
} from "../api";



export function useInventory() {


  const [items, setItems] =
    useState<any[]>([]);


  const [loading, setLoading] =
    useState(false);



  async function refresh() {

    try {

      setLoading(true);


      const res =
        await inventoryApi.getAll();


      console.log(
        "Inventory Response:",
        res.data
      );


      setItems(
        res.data
      );


    }
    catch(error){

      console.log(
        "Inventory Error:",
        error
      );

    }
    finally {

      setLoading(false);

    }

  }



  useEffect(()=>{

    refresh();

  },[]);



  return {

    items,

    loading,

    refresh

  };


}