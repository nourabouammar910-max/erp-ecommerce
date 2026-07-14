import api from "../../api/axios";


export const warehousesApi = {

  getAll(){
    return api.get("/warehouses");
  },


  getOne(id:string){
    return api.get(`/warehouses/${id}`);
  },


  create(data:any){
    return api.post("/warehouses",data);
  },


  update(id:string,data:any){
    return api.patch(
      `/warehouses/${id}`,
      data
    );
  },


  remove(id:string){
    return api.delete(
      `/warehouses/${id}`
    );
  }

};