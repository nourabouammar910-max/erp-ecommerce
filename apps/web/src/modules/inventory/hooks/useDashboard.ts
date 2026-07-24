import {
  useEffect,
  useState
} from "react";


import {
  inventoryApi
} from "../api";



export function useDashboard(){


  const [dashboard,setDashboard] =
  useState<any>(null);



  async function refresh(){


    try {


      const res =
      await inventoryApi.getAll();



      const items =
      res.data;



      setDashboard({

        totalProducts:
        items.length,


        totalQuantity:
        items.reduce(
          (
            total:number,
            item:any
          ) =>
          total + item.quantity,
          0
        ),



        lowStock:
        items.filter(
          (item:any)=>
          item.quantity <= 5
        ).length


      });



    }
    catch(error){

      console.log(
        "Dashboard Error",
        error
      );

    }


  }



  useEffect(()=>{


    refresh();


  },[]);



  return {


    dashboard,


    refresh


  };


}