import { useEffect, useState } from "react";
import { categoriesApi } from "../api";


export function useCategories(){


const [categories,setCategories]=useState<any[]>([]);

const [loading,setLoading]=useState(false);



async function refresh(){


setLoading(true);


const res =
await categoriesApi.getAll();


setCategories(
 res.data
);


setLoading(false);


}



useEffect(()=>{

refresh();

},[]);



return {

categories,

loading,

refresh

};


}