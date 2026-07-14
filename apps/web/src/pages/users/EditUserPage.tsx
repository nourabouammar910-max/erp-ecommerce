import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import UserForm from "./components/UserForm";
import { usersApi } from "./api";


export default function EditUserPage(){

  const { id } = useParams();

  const navigate = useNavigate();

  const [user,setUser] = useState<any>(null);


  useEffect(()=>{

  async function load(){

    try {

      const res = await usersApi.getOne(Number(id));

      console.log("USER DATA:", res.data);

      setUser(res.data);

    } catch(error:any){

      console.log(
        "LOAD USER ERROR:",
        error.response?.data || error.message
      );

    }

  }

  load();

},[id]);


  if(!user){

    return (
      <p>
        Loading user...
      </p>
    );

  }



  async function update(data:any){

    await usersApi.update(
      Number(id),
      data
    );


    navigate("/users");

  }



  return (

    <div>

      <h1>
        Edit User
      </h1>


      <UserForm
        initial={user}
        onSubmit={update}
      />


    </div>

  );

}