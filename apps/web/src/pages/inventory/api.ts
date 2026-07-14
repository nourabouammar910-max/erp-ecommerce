import axios from "axios";


const api = axios.create({

  baseURL:"http://localhost:3000",

});



export const inventoryApi = {


  getAll(){

    return api.get("/inventory");

  },



  getProducts(){

    return api.get("/inventory/products");

  },



  getWarehouses(){

    return api.get("/warehouses");

  },



  getMovements(){

    return api.get("/inventory/movements");

  },



  add(data:any){

    return api.post(
      "/inventory/add",
      data
    );

  },



  remove(data:any){

    return api.post(
      "/inventory/remove",
      data
    );

  },



  adjust(data:any){

    return api.post(
      "/inventory/adjust",
      data
    );

  }


};