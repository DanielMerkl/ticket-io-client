import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const api = axios.create({
  baseURL: backendUrl,
});
