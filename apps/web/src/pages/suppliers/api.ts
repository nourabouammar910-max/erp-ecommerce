import axios from "axios";

const API = "http://localhost:3000/suppliers";

export const suppliersApi = {

  getAll() {
    return axios.get(API);
  },

  getOne(id: string) {
    return axios.get(`${API}/${id}`);
  },

  create(data: any) {
    return axios.post(API, data);
  },

  update(id: string, data: any) {
    return axios.patch(`${API}/${id}`, data);
  },

  remove(id: string) {
    return axios.delete(`${API}/${id}`);
  },

};