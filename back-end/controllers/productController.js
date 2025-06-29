import { getAllProductsModel, getProductByIdModel } from "../models/productModels.js";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsModel();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params; 
  try {
    const product = await getProductByIdModel(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};
