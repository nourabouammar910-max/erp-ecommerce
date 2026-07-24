import {
useEffect,
useState
} from "react";


import {
categoriesApi
} from "../api";



export function useCategories(){


const [categories,setCategories]=
useState<any[]>([]);


const [loading,setLoading]=
useState(false);



async function refresh(){


try{


setLoading(true);


const res =
await categoriesApi.getAll();


setCategories(
Array.isArray(res.data)
?
res.data
:
[]
);



}catch(error){

console.log(
"Categories Load Error",
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

categories,

loading,

refresh

};


}