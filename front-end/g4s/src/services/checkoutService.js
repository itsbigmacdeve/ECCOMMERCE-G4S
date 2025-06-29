import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const checkout = async () => {
  const token = localStorage.getItem('token');
  return axios.post(`${API}/checkout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
