import { useState } from "react";


interface Props {

initial?:any;

onSubmit:(data:any)=>void;

}



export default function CategoryForm({
initial,
onSubmit
}:Props){


const [name,setName]=useState(
 initial?.name || ""
);



function submit(e:any){

e.preventDefault();


onSubmit({
 name
});


}



return (

<form onSubmit={submit}>


<input

placeholder="Category name"

value={name}

onChange={
e=>setName(e.target.value)
}

/>


<br/>


<button>

Save

</button>


</form>

);


}