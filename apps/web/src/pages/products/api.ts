import api from "../../api/axios";

export const productsApi = {
  getAll() {
    return api.get("/products");
  },

  getOne(id: string) {
    return api.get(`/products/${id}`);
  },

  create(data: any) {
    return api.post("/products", data);
  },

  update(id: string, data: any) {
    return api.patch(`/products/${id}`, data);
  },

  remove(id: string) {
    return api.delete(`/products/${id}`);
  },
};