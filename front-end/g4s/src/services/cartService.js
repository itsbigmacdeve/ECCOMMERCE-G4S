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

// Función para obtener el carrito del usuario autenticado
export const getCart = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Funcion para eliminar un producto del carrito
export const deleteItemFromCart = async (productId) => {
  const token = localStorage.getItem('token');
  return axios.post(
    `${API}/cart/deleteById`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Función para eliminar el carrito del usuario autenticado
export const deleteCart = async () => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API}/cart/deleteCart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


