import axios from "axios";
import { logout, useAuthDispatch, useAuthState } from "@src/lib/context/AuthContext";

export function useAxios() {
  const { token } = useAuthState();
  const dispatch = useAuthDispatch();

  axios.interceptors.request.use((config) => {
    // if(config.method === 'post') {
    //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //     config.data = qs.stringify(config.data)
    // }

    if (
      token &&
      config.url &&
      !config.url.includes("https://api.thegraph.com") &&
      !config.url.includes("https://ipfs.io/")
    ) {
      config!.headers!.common["Authorization"] = `Bearer ${token}`;
    }

    config.baseURL = `${import.meta.env.VITE_API_URL}/api/`;
    config.timeout = 300000;

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout(dispatch);
        console.log("Auth failed");
        //window.location.reload();
      }

      return Promise.reject(error);
    }
  );
}
