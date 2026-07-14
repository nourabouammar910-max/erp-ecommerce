import {
  useEffect,
  useState
} from "react";


import {
  inventoryApi
} from "../api";



export function useDashboard(){


const [dashboard,setDashboard]
=
useState<any>(null);



async function refresh(){


const res =
await inventoryApi.getDashboard();


setDashboard(
res.data
);


}



useEffect(()=>{

refresh();

},[]);



return {

dashboard,
refresh

};


}