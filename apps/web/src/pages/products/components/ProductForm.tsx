import { useState } from "react";
import { useCategories } from "../../categories/hooks/useCategories";


interface Props {

  initial?: any;

  onSubmit: (data:any)=>void;

}


export default function ProductForm({
  initial,
  onSubmit
}:Props){


const {
  categories
}=useCategories();



const [name,setName]=useState(
  initial?.name || ""
);


const [price,setPrice]=useState(
  initial?.price || ""
);


const [cost,setCost]=useState(
  initial?.cost || ""
);


const [categoryId,setCategoryId]=useState(
  initial?.categoryId || ""
);



function submit(e:any){

  e.preventDefault();


  onSubmit({

    name,

    price:Number(price),

    cost:Number(cost),

    categoryId:Number(categoryId)

  });


}



return (

<form onSubmit={submit}>


<input

placeholder="Product name"

value={name}

onChange={
e=>setName(e.target.value)
}

/>


<br/>


<input

placeholder="Price"

type="number"

value={price}

onChange={
e=>setPrice(e.target.value)
}

/>


<br/>


<input

placeholder="Cost"

type="number"

value={cost}

onChange={
e=>setCost(e.target.value)
}

/>


<br/>


<select

value={categoryId}

onChange={
e=>setCategoryId(e.target.value)
}

>

<option value="">
Select Category
</option>


{
categories.map((cat:any)=>(

<option

key={cat.id}

value={cat.id}

>

{cat.name}

</option>

))
}


</select>


<br/>


<button type="submit">

Save

</button>


</form>

);

}