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

CircularProgress

} from "@mui/material";


import toast from "react-hot-toast";


import {
 categoriesApi
} from "../api";



interface Props {

open:boolean;

onClose:()=>void;

refresh:()=>void | Promise<void>;

category?:any;

}



export default function CategoryForm({

open,

onClose,

refresh,

category

}:Props){



const [loading,setLoading]=
useState(false);



const [name,setName]=
useState("");





useEffect(()=>{


setName(
category?.name ?? ""
);


},[category,open]);







async function save(){



if(!name.trim()){


toast.error(
"Category name is required"
);


return;


}



try{


setLoading(true);



const data={

name:name.trim()

};





if(category){


await categoriesApi.update(

category.id,

data

);



toast.success(
"Category updated successfully"
);



}

else{


await categoriesApi.create(

data

);



toast.success(
"Category created successfully"
);



}





await refresh();



setName("");



onClose();



}

catch(err:any){



toast.error(

err?.response?.data?.message ??

"Operation failed"

);



}

finally{


setLoading(false);


}



}





return(


<Dialog

open={open}

onClose={
loading ? undefined : onClose
}

fullWidth

maxWidth="sm"

>



<DialogTitle>


{
category ?

"Edit Category"

:

"Create Category"

}


</DialogTitle>



<DialogContent>


<TextField


fullWidth


sx={{
mt:2
}}


label="Category Name"


value={name}


onChange={(e)=>
setName(e.target.value)
}



/>



</DialogContent>




<DialogActions>


<Button

disabled={loading}

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
loading ?

<CircularProgress size={22}/>


:

category ?

"Update"

:

"Create"

}



</Button>



</DialogActions>




</Dialog>


);


}