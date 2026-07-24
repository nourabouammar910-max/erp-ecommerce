import {
useEffect,
useState
} from "react";


import {

Dialog,

DialogTitle,

DialogContent,

DialogActions,

Button,

TextField,

Stack,

CircularProgress

} from "@mui/material";


import toast from "react-hot-toast";


import {
suppliersApi
} from "../api";



interface Props{

open:boolean;

onClose:()=>void;

refresh:()=>void | Promise<void>;

supplier?:any;

}



export default function SupplierForm({

open,

onClose,

refresh,

supplier

}:Props){



const [loading,setLoading]=
useState(false);



const [form,setForm]=useState({

name:"",

phone:"",

email:""

});





useEffect(()=>{


setForm({

name:supplier?.name ?? "",

phone:supplier?.phone ?? "",

email:supplier?.email ?? ""

});


},[supplier,open]);







async function save(){



if(!form.name.trim()){


toast.error(
"Supplier name is required"
);


return;


}




try{


setLoading(true);



if(supplier){


await suppliersApi.update(

supplier.id,

form

);


toast.success(
"Supplier updated"
);



}

else{


await suppliersApi.create(

form

);



toast.success(
"Supplier created"
);



}



await refresh();



setForm({

name:"",

phone:"",

email:""

});



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
supplier ?

"Edit Supplier"

:

"Create Supplier"

}

</DialogTitle>



<DialogContent>


<Stack

spacing={2}

mt={2}

>


<TextField

label="Supplier Name"

value={form.name}

fullWidth

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

/>




<TextField

label="Phone"

value={form.phone}

fullWidth

onChange={(e)=>

setForm({

...form,

phone:e.target.value

})

}

/>



<TextField

label="Email"

value={form.email}

fullWidth

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

/>



</Stack>


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

supplier ?

"Update"

:

"Create"

}


</Button>



</DialogActions>



</Dialog>


);


}