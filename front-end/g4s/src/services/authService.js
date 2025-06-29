import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const registerUser = (username, password) =>
  axios.post(`${API}/user/register`, { username, password });

export const loginUser = (username, password) =>
  axios.post(`${API}/user/login`, { username, password });
