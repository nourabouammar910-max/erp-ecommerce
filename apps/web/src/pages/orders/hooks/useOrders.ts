import {
useEffect,
useState
} from "react";


import {
ordersApi
} from "../api";



export function useOrders(){


const [orders,setOrders] =
useState<any[]>([]);



const [loading,setLoading] =
useState(false);




async function refresh(){


try{


setLoading(true);



const res =
await ordersApi.getAll();



setOrders(

Array.isArray(res.data)

?

res.data

:

[]

);



}

catch(error){


console.log(
"Orders Load Error:",
error
);



setOrders([]);


}

finally{


setLoading(false);


}


}




useEffect(()=>{


refresh();


},[]);



return {


orders,


loading,


refresh


};


}