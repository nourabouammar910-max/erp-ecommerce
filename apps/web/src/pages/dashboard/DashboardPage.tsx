import {
useEffect,
useState
} from "react";


import api from "../../api/axios";


import {
CircularProgress,
Typography
} from "@mui/material";


import StatsCards from "./components/StatsCards";


export default function DashboardPage(){


const [stats,setStats]=
useState<any>(null);



useEffect(()=>{


api.get(
"/dashboard/stats"
)

.then(res=>{


console.log(
"DASHBOARD:",
res.data
);


setStats(
res.data
);


})


.catch(err=>{


console.log(
"DASHBOARD ERROR",
err
);


});


},[]);




if(!stats){

return <CircularProgress />;

}



return (

<>

<Typography
variant="h4"
fontWeight="bold"
mb={3}
>

Dashboard

</Typography>


<StatsCards
stats={stats}
/>


</>

);


}