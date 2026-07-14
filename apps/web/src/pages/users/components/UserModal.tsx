import { useState } from "react";
import { usersApi } from "../api";


interface Props {
  onClose: () => void;
  refresh: () => void;
}


export default function UserModal({
  onClose,
  refresh
}: Props) {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function save() {

    try {

      setLoading(true);
      setError("");

      await usersApi.create({
        name,
        email,
        password
      });


      refresh();
      onClose();


    } catch (err:any) {

      setError(
        err?.response?.data?.message ||
        "Failed to create user"
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <div
      style={{
        position:"fixed",
        top:0,
        left:0,
        right:0,
        bottom:0,
        background:"#0005",
        display:"grid",
        placeItems:"center",
        zIndex:1000
      }}
    >


      <div
        style={{
          background:"#fff",
          padding:30,
          width:350,
          borderRadius:10
        }}
      >


        <h2>
          Create User
        </h2>



        {
          error &&
          <p style={{color:"red"}}>
            {error}
          </p>
        }



        <input
          placeholder="Name"
          value={name}
          onChange={
            e=>setName(e.target.value)
          }
          style={{
            width:"100%",
            padding:10,
            marginBottom:10
          }}
        />



        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={
            e=>setEmail(e.target.value)
          }
          style={{
            width:"100%",
            padding:10,
            marginBottom:10
          }}
        />



        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={
            e=>setPassword(e.target.value)
          }
          style={{
            width:"100%",
            padding:10,
            marginBottom:20
          }}
        />



        <div
          style={{
            display:"flex",
            gap:10
          }}
        >


          <button
            onClick={save}
            disabled={loading}
          >
            {
              loading
              ? "Saving..."
              : "Save"
            }
          </button>



          <button
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>


        </div>



      </div>


    </div>

  );

}