interface Props {

 dashboard:any;

}



export default function InventoryDashboard({
 dashboard
}:Props){


if(!dashboard){

return <p>Loading dashboard...</p>;

}



return (

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(5,1fr)",
gap:20,
marginBottom:30
}}
>


<Card
title="Products"
value={dashboard.totalProducts}
/>


<Card
title="Warehouses"
value={dashboard.totalWarehouses}
/>


<Card
title="Stock Rows"
value={dashboard.totalStockRows}
/>


<Card
title="Total Quantity"
value={dashboard.totalQuantity}
/>


<Card
title="Low Stock"
value={dashboard.lowStock}
/>


</div>

);


}




function Card({
title,
value
}:{
title:string;
value:number;
}){


return (

<div

style={{

border:"1px solid #ddd",

padding:20,

borderRadius:8,

textAlign:"center"

}}

>


<h3>
{title}
</h3>


<h1>
{value}
</h1>


</div>

);


}