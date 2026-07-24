import {
Paper,
Typography
} from "@mui/material";

interface Props{

title:string;

value:any;

color?:string;

}

export default function StatCard({

title,

value,

color="#1976d2"

}:Props){

return(

<Paper
elevation={3}
sx={{
p:3,
borderRadius:3
}}
>

<Typography
color="text.secondary"
>
{title}
</Typography>

<Typography
variant="h4"
fontWeight="bold"
sx={{
color
}}
>
{value}
</Typography>

</Paper>

);

}