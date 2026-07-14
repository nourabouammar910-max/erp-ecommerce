import { useEffect, useState } from "react";
import { warehousesApi } from "../api";


export function useWarehouses(){

const [warehouses,setWarehouses]=useState<any[]>([]);
const [loading,setLoading]=useState(false);


async function refresh(){

try{

setLoading(true);

const res = await warehousesApi.getAll();

setWarehouses(res.data);


}catch(error){

console.log(
"LOAD WAREHOUSES ERROR",
error
);


}finally{

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