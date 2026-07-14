import {useEffect,useState} from "react";
import {productsApi} from "../api";


export function useProducts(){

const [products,setProducts]=useState<any[]>([]);

const [loading,setLoading]=useState(true);



async function load(){

try{

setLoading(true);

const res = await productsApi.getAll();

setProducts(res.data);


}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}

}



useEffect(()=>{

load();

},[]);



return {

products,
loading,
refresh:load

};


}