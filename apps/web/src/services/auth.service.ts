import api from "../api/axios";
import type { LoginRequest } from "../types/auth";

export const authService = {
  login(data: LoginRequest) {
    return api.post("/auth/login", data);
  },

  refresh(refresh_token: string) {
    return api.post("/auth/refresh", {
      refresh_token,
    });
  },
};