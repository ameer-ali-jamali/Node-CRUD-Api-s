import axios from "axios";

export const BASE_URL = `http://localhost:3000`;

export const getRecords = (url) => {
  return axios.get(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const postRecords = (url, data) => {
  return axios.post(`${BASE_URL}${url}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const putRecords = (url, data) => {
  return axios.post(`${BASE_URL}${url}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteRecords = (url) => {
  return axios.delete(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
