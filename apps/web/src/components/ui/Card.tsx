import {
 Paper
} from "@mui/material";


interface Props{

children:React.ReactNode;

}


export default function Card({
children
}:Props){

return (

<Paper

elevation={3}

sx={{

p:3,

borderRadius:3

}}

>

{children}

</Paper>

);

}