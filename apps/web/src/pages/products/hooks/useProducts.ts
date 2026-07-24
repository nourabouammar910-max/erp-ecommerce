import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { productsApi } from "../api";
import { useAuth } from "../../../hooks/useAuth";


export function useProducts() {

  const { user } = useAuth();


  const [products, setProducts] =
    useState<any[]>([]);


  const [loading, setLoading] =
    useState(false);



  const refresh = useCallback(async () => {


    const token =
      localStorage.getItem("access_token");


    if (!token || !user) {

      setProducts([]);

      return;

    }



    try {

      setLoading(true);


      const response =
        await productsApi.getAll();



      const data =
        Array.isArray(response.data)
          ? response.data
          : response.data?.products ?? [];



      console.log(
        "✅ PRODUCTS:",
        data
      );


      setProducts(data);



    } catch (error:any) {


      console.error(
        "❌ PRODUCTS ERROR:",
        error?.response?.data || error
      );


      setProducts([]);



    } finally {


      setLoading(false);


    }


  }, [user]);




  useEffect(() => {

    refresh();

  }, [refresh]);




  return {

    products,

    loading,

    refresh,

  };

}