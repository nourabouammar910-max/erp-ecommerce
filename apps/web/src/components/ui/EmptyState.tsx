import {
Paper,
Typography
} from "@mui/material";

interface Props{
text:string;
}

export default function EmptyState({
text
}:Props){

return(

<Paper
sx={{
p:6,
textAlign:"center"
}}
>

<Typography>

{text}

</Typography>

</Paper>

);

}