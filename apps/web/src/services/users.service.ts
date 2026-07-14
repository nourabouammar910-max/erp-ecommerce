import api from "../api/axios";
import type { User } from "../types/user";


export const usersService = {

  getAll() {
    return api.get<User[]>("/users");
  },


  create(data: any) {
    return api.post("/users", data);
  },


  update(id: number, data: any) {
    return api.patch(
      `/users/${id}`,
      data
    );
  },


  remove(id: number) {
    return api.delete(
      `/users/${id}`
    );
  },

};