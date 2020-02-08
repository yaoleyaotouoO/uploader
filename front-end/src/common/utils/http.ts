import axios, { AxiosPromise } from "axios";
import Qs from "qs";
import { getReturnUrlPath } from './base';
import { getToken } from './user';
import { HttpStatusType } from "@common/enums/base";
import { environment } from '@common/utils/environment';

const isDevelopment = process.env.NODE_ENV === "development";

export const Api = {
  jumpURL: isDevelopment ? "" : "",
  axios: axios.create({
    baseURL: environment,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
  }),
  withForm: {
    transformRequest: (data: Object) => Qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
};

Api.axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Api.axios.interceptors.response.use(
  response => {
    if (response.status === HttpStatusType.Unauthorized) {
      const path = getReturnUrlPath();
      if (path) {
        window.location.href = `#/login?${path}`;
      }
    }
    return response;
  },
  (error: string) => {
    const err = error ? error.toString() : '';
    if (err.indexOf('status code 401') > -1) {
      const path = getReturnUrlPath();
      if (path) {
        window.location.href = `#/login?${path}`;
      }
    }
    return Promise.reject(error);
  }
);

export const Q = <T>(axiosPromise: AxiosPromise, clearLoading?: () => void): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    axiosPromise
      .then(response => resolve(response.data))
      .catch(error => {
        console.warn(`Q function error: `, error);
        if (clearLoading) {
          clearLoading();
          // window.promptManager.show({ title: "Something was wrong!", message: `${error}` });
        }
        reject(new Error(`${error}`));
      });
  });
};

export default Api.axios;
