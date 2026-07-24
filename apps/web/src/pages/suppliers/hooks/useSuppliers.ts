import {
  useEffect,
  useState
} from "react";

import {
  suppliersApi
} from "../api";


export function useSuppliers() {


  const [suppliers, setSuppliers] =
    useState<any[]>([]);


  const [loading, setLoading] =
    useState(false);



  async function refresh() {

    try {

      setLoading(true);


      const res =
        await suppliersApi.getAll();



      setSuppliers(
        Array.isArray(res.data)
          ? res.data
          : []
      );



    } catch (error) {


      console.log(
        "Suppliers Load Error:",
        error
      );


      setSuppliers([]);


    } finally {


      setLoading(false);


    }

  }



  useEffect(() => {

    refresh();

  }, []);



  return {

    suppliers,

    loading,

    refresh

  };


}