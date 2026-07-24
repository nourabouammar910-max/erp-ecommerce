import {
  useEffect,
  useState,
} from "react";


import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";


import toast from "react-hot-toast";


import {
  inventoryApi
} from "../api";



interface Props {

  open:boolean;

  onClose:()=>void;

  refresh:()=>void;

}



export default function AdjustStockModal({

  open,

  onClose,

  refresh

}:Props){



const [loading,setLoading]=
useState(false);



const [products,setProducts]=
useState<any[]>([]);



const [warehouses,setWarehouses]=
useState<any[]>([]);



const [form,setForm]=useState({

 productId:"",

 warehouseId:"",

 quantity:"",

 type:"add"

});





async function loadData(){


try{


const productsRes =
await inventoryApi.getProducts();



const warehousesRes =
await inventoryApi.getWarehouses();



setProducts(
productsRes.data
);



setWarehouses(
warehousesRes.data
);



}catch(error){


console.log(error);


}



}




useEffect(()=>{


if(open){

loadData();

}



},[open]);






function change(
key:string,
value:any
){


setForm({

...form,

[key]:value

});


}






async function save(){


try{


setLoading(true);



const data={


productId:
Number(form.productId),



warehouseId:
Number(form.warehouseId),



quantity:
Number(form.quantity)


};





if(form.type==="add"){


await inventoryApi.add(data);


toast.success(
"Stock added"
);



}



else if(
form.type==="remove"
){


await inventoryApi.remove(data);


toast.success(
"Stock removed"
);



}



else{


await inventoryApi.adjust(data);


toast.success(
"Stock adjusted"
);



}



refresh();


onClose();



setForm({

productId:"",

warehouseId:"",

quantity:"",

type:"add"

});



}
catch(error:any){


toast.error(

error?.response?.data?.message
||
"Operation failed"

);


}
finally{


setLoading(false);


}



}







return (


<Dialog

open={open}

onClose={onClose}

fullWidth

maxWidth="sm"

>



<DialogTitle>

Adjust Stock

</DialogTitle>




<DialogContent>


<Stack
spacing={2}
mt={2}
>



<TextField

select

label="Product"

value={
form.productId
}

onChange={
(e)=>
change(
"productId",
e.target.value
)
}

fullWidth

>


{

products.map(
(product)=>(


<MenuItem

key={
product.id
}

value={
product.id
}

>


{product.name}


</MenuItem>


)

)

}



</TextField>





<TextField

select

label="Warehouse"

value={
form.warehouseId
}

onChange={
(e)=>
change(
"warehouseId",
e.target.value
)
}

fullWidth

>


{

warehouses.map(
(warehouse)=>(


<MenuItem

key={
warehouse.id
}

value={
warehouse.id
}

>


{warehouse.name}


</MenuItem>


)

)

}



</TextField>






<TextField

select

label="Action"

value={
form.type
}

onChange={
(e)=>
change(
"type",
e.target.value
)
}

fullWidth

>



<MenuItem value="add">

Add

</MenuItem>



<MenuItem value="remove">

Remove

</MenuItem>



<MenuItem value="adjust">

Adjust

</MenuItem>



</TextField>






<TextField

label="Quantity"

type="number"

value={
form.quantity
}

onChange={
(e)=>
change(
"quantity",
e.target.value
)
}

fullWidth

/>




</Stack>


</DialogContent>





<DialogActions>


<Button
onClick={onClose}
>

Cancel

</Button>




<Button

variant="contained"

disabled={loading}

onClick={save}

>


{

loading

?

<CircularProgress
size={22}
/>

:

"Save"

}



</Button>


</DialogActions>



</Dialog>


);


}