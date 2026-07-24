import api from "../../api/axios";


export const ordersApi = {


getAll(){

return api.get("/orders");

},



getOne(id:string){

return api.get(
`/orders/${id}`
);

},



create(data:any){

return api.post(
"/orders",
data
);

},



update(
id:string,
data:any
){

return api.patch(
`/orders/${id}`,
data
);

},



remove(id:string){

return api.delete(
`/orders/${id}`
);

}



};