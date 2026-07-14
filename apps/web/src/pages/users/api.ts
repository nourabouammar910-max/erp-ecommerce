import api from "../../api/axios";
import type { User } from "./types/user";


export const usersApi = {

  getAll() {
    return api.get<User[]>("/users");
  },


  getOne(id:number) {
    return api.get<User>(`/users/${id}`);
  },


  create(data:any) {
    return api.post("/users", data);
  },


  update(id:number,data:any) {
    return api.patch(`/users/${id}`, data);
  },


  remove(id:number) {
    return api.delete(`/users/${id}`);
  }

};