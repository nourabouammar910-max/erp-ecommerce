import api from "../../api/axios";


export const categoriesApi = {


  getAll(){

    return api.get("/categories");

  },


  getOne(id:number){

    return api.get(
      `/categories/${id}`
    );

  },


  create(data:any){

    return api.post(
      "/categories",
      data
    );

  },


  update(
    id:number,
    data:any
  ){

    return api.patch(
      `/categories/${id}`,
      data
    );

  },


  remove(id:number){

    return api.delete(
      `/categories/${id}`
    );

  }


};