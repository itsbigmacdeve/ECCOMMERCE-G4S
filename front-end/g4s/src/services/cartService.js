import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

// Función para agregar un producto al carrito
export const addToCart = async (productId, quantity) => {
  const token = localStorage.getItem('token');
  return axios.post(
    `${API}/cart/add`,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// (opcional) Para obtener el carrito
export const getCart = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
