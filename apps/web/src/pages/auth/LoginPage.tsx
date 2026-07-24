import {
  FormEvent,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../hooks/useAuth";


export default function LoginPage() {


const navigate = useNavigate();


const {
login
}=useAuth();



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");





async function handleSubmit(
e:FormEvent
){

e.preventDefault();


setError("");

setLoading(true);



try{


const result =
await login({
email,
password,
});



console.log(
"LOGIN SUCCESS:",
result.data
);



const token =
localStorage.getItem(
"access_token"
);



if(token){

navigate(
"/dashboard",
{
replace:true
}
);

}



}
catch(err:any){


console.log(
"LOGIN ERROR",
err
);


setError(
err?.response?.data?.message ||
"Login failed"
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
height:"100vh"
}}
>


<form
onSubmit={handleSubmit}
style={{
width:350,
padding:30,
border:"1px solid #ddd",
borderRadius:10
}}
>


<h2>
ERP Login
</h2>



<input

type="email"

placeholder="Email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

style={{
width:"100%",
padding:10,
marginTop:20
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
padding:10,
marginTop:15
}}

/>



{
error &&

<p
style={{
color:"red"
}}
>

{error}

</p>

}



<button

type="submit"

disabled={loading}

style={{
width:"100%",
padding:10,
marginTop:20
}}

>

{
loading
?
"Logging in..."
:
"Login"
}


</button>



</form>


</div>


);


}