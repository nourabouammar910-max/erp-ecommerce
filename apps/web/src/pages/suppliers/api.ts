import api from "../../api/axios";


const API = "/suppliers";



export const suppliersApi = {



getAll(){

return api.get(API);

},



getOne(id:string | number){

return api.get(
`${API}/${id}`
);

},



create(data:any){

return api.post(
API,
data
);

},



update(
id:string | number,
data:any
){

return api.patch(
`${API}/${id}`,
data
);

},



remove(id:string | number){

return api.delete(
`${API}/${id}`
);

},



};