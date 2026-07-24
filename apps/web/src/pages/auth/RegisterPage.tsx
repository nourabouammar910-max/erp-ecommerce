import {
FormEvent,
useState
} from "react";


import {
useNavigate
} from "react-router-dom";


import api from "../../api/axios";



export default function RegisterPage(){


const navigate = useNavigate();


const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [error,setError]=useState("");

const [loading,setLoading]=useState(false);




async function handleSubmit(
e:FormEvent
){

e.preventDefault();

setError("");

setLoading(true);



try{


await api.post(
"/auth/register",
{
name,
email,
password
}
);



navigate("/");



}catch(err:any){


setError(
err?.response?.data?.message ||
"Register failed"
);



}
finally{

setLoading(false);

}



}



return (

<div

style={{

display:"grid",

placeItems:"center",

height:"100vh",

background:"#f5f7fb"

}}

>


<form

onSubmit={handleSubmit}

style={{

width:380,

padding:35,

background:"white",

borderRadius:15,

boxShadow:"0 10px 30px #ddd"

}}

>



<h2>

Create Account

</h2>



<input

placeholder="Name"

value={name}

onChange={
e=>setName(e.target.value)
}

style={{

width:"100%",

padding:12,

marginTop:15

}}

/>




<input

type="email"

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

style={{

width:"100%",

padding:12,

marginTop:15

}}

/>




<input

type="password"

placeholder="Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

style={{

width:"100%",

padding:12,

marginTop:15

}}

/>




{
error &&

<p style={{
color:"red"
}}>

{error}

</p>

}




<button

disabled={loading}

style={{

width:"100%",

padding:12,

marginTop:20,

background:"#1976d2",

color:"white",

border:0,

borderRadius:8

}}

>


{
loading
?
"Creating..."
:
"Create Account"
}


</button>




<p

style={{

cursor:"pointer",

marginTop:20

}}

onClick={()=>navigate("/")}

>

Back to Login

</p>



</form>



</div>


);


}