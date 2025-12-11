import axios from "axios";

const baseURL = "https://backend-asistencia-pattern.onrender.com/api/" 


const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        limpiarSesionYRedirigir();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${baseURL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error al refrescar token:", refreshError);
        limpiarSesionYRedirigir();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

function limpiarSesionYRedirigir() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/";
}

export default axiosInstance;
