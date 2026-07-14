import { useEffect, useState } from "react";
import { usersApi } from "../api";
import type { User } from "../types/user";


export function useUsers(){

const [users,setUsers]=useState<User[]>([]);
const [loading,setLoading]=useState(false);


async function fetchUsers(){

try{

setLoading(true);

const res = await usersApi.getAll();

setUsers(res.data);

}
finally{

setLoading(false);

}

}


async function createUser(data:any){

const res = await usersApi.create(data);

await fetchUsers();

return res.data;

}



async function updateUser(id:number,data:any){

const res = await usersApi.update(id,data);

await fetchUsers();

return res.data;

}



async function deleteUser(id:number){

await usersApi.remove(id);

await fetchUsers();

}



useEffect(()=>{

fetchUsers();

},[]);



return {
  users,
  loading,
  refresh: fetchUsers,
  createUser,
  updateUser,
  deleteUser
};

}