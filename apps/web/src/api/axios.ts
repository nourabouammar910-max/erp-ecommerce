import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      "REQUEST:",
      config.url,
      config.headers?.Authorization
    );

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken =
        localStorage.getItem("refresh_token");

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "http://localhost:3000/auth/refresh",
          {
            refresh_token: refreshToken,
          }
        );

        const accessToken =
          res.data.access_token;

        localStorage.setItem(
          "access_token",
          accessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (e) {
        logout();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

function logout() {
  localStorage.clear();
  window.location.href = "/";
}

export default api;