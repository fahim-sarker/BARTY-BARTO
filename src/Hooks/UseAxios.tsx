import axios, { type AxiosInstance } from "axios";

function useAxios(token: string | null = null): AxiosInstance {
  const authToken = token || localStorage.getItem("authToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
    headers,
  });

  return axiosInstance;
}

export default useAxios;

