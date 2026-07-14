import { useState } from "react";


interface Props {

initial?:{
 name:string;
 email:string;
}

onSubmit:(data:any)=>void;

}



export default function UserForm({
initial,
onSubmit
}:Props){


const [name,setName]=useState(
 initial?.name || ""
);

const [email,setEmail]=useState(
 initial?.email || ""
);

const [password,setPassword]=useState("");



function submit(e:any){

e.preventDefault();


onSubmit({
 name,
 email,
 ...(password && {password})
});


}



return (

<form onSubmit={submit}>


<input
placeholder="Name"
value={name}
onChange={e=>setName(e.target.value)}
/>


<br/>


<input
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>


<br/>


<input
placeholder="Password"
type="password"
value={password}
onChange={e=>setPassword(e.target.value)}
/>


<br/>


<button>
Save
</button>


</form>

);


}