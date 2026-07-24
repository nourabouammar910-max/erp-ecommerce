import {
  useEffect,
  useState
} from "react";


import {
  warehousesApi
} from "../api";



export function useWarehouses(){


const [warehouses,setWarehouses] =
useState<any[]>([]);



const [loading,setLoading] =
useState(false);




async function refresh(){


try{


setLoading(true);



const res =
await warehousesApi.getAll();



setWarehouses(

Array.isArray(res.data)

?
res.data

:

[]

);



}

catch(error){


console.log(
"Warehouses Load Error:",
error
);


setWarehouses([]);


}

finally{


setLoading(false);


}


}




useEffect(()=>{


refresh();


},[]);



return {


warehouses,


loading,


refresh


};


}