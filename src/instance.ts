import axios from 'axios';
// export const baseUrl = "http://192.168.101.74:8000";
export const baseUrl = 'http://localhost:8000';
export const instance = axios.create({
  baseURL: baseUrl,
});
