import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const userAxiosSecure = () => {
  const { user,signOutUser } = useContext(AuthContext);

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  //   responce interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
        if(error.status == 401 ){
            signOutUser()
            .then(() => {
                console.log("signout success");
            })
            .catch(error => {
                console.log(error);
            })
        }
      console.log("error in interceptor");
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default userAxiosSecure;
