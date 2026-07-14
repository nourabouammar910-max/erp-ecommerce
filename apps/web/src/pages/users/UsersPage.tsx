import { useState } from "react";

import { useUsers } from "./hooks/useUsers";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/UserModal";


export default function UsersPage(){

  const {
    users,
    loading,
    refresh
  } = useUsers();


  const [open,setOpen] =
    useState(false);


  return (

    <div>

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          marginBottom:20
        }}
      >

        <h1>
          Users
        </h1>


        <button
          onClick={()=>{
            setOpen(true)
          }}
        >
          Add User
        </button>


      </div>



      {
        loading
        ?
        <p>
          Loading...
        </p>
        :
      <UsersTable
  users={users}
  refresh={refresh}
/>
      }



      {
        open &&
        <UserModal
          onClose={()=>{
            setOpen(false)
          }}
          refresh={refresh}
        />
      }


    </div>

  );
}