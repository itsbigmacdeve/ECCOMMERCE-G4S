import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getProducts = () => api.get('/products');

export default api;
