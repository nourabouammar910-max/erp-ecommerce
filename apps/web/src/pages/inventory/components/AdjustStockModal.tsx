import {
  useEffect,
  useState
} from "react";


import {
  inventoryApi
} from "../api";



interface Props {

  onClose:()=>void;

  refresh:()=>void;

}



export default function AdjustStockModal({

  onClose,

  refresh

}:Props){



const [products,setProducts]=
useState<any[]>([]);



const [warehouses,setWarehouses]=
useState<any[]>([]);



const [productId,setProductId]=
useState("");



const [warehouseId,setWarehouseId]=
useState("");



const [quantity,setQuantity]=
useState("");



const [type,setType]=
useState("ADJUST");




useEffect(()=>{


async function load(){


const p =
await inventoryApi.getProducts();


const w =
await inventoryApi.getWarehouses();



setProducts(
 p.data
);



setWarehouses(
 w.data
);



}



load();



},[]);






async function save(){


const data={


productId,

warehouseId,

quantity:Number(quantity)


};




if(type==="ADD"){


await inventoryApi.add(data);


}



if(type==="REMOVE"){


await inventoryApi.remove(data);


}



if(type==="ADJUST"){


await inventoryApi.adjust(data);


}




refresh();

onClose();


}






return (

<div

style={{

position:"fixed",

inset:0,

background:"#0005",

display:"grid",

placeItems:"center"

}}

>



<div

style={{

background:"#fff",

padding:30,

width:400

}}

>



<h2>
Stock Operation
</h2>





<select

value={productId}

onChange={
e=>setProductId(e.target.value)
}

>

<option>
Select Product
</option>


{
products.map(p=>(

<option
key={p.id}
value={p.id}
>

{p.name}

</option>

))

}


</select>




<br/><br/>





<select

value={warehouseId}

onChange={
e=>setWarehouseId(e.target.value)
}

>


<option>
Select Warehouse
</option>



{
warehouses.map(w=>(


<option

key={w.id}

value={w.id}

>

{w.name}

</option>


))

}



</select>




<br/><br/>





<select

value={type}

onChange={
e=>setType(e.target.value)
}

>


<option value="ADD">
Add Stock
</option>


<option value="REMOVE">
Remove Stock
</option>


<option value="ADJUST">
Adjust Stock
</option>


</select>




<br/><br/>





<input

type="number"

placeholder="Quantity"

value={quantity}

onChange={
e=>setQuantity(e.target.value)
}

/>




<br/><br/>





<button onClick={save}>

Save

</button>



<button

onClick={onClose}

style={{
marginLeft:10
}}

>

Cancel

</button>



</div>



</div>


);


}