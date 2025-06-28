import { connection } from '../db.js';

//Para obtener todos los productos
// Utilizando un procedimiento almacenado llamado GetAllProducts
export const getAllProductsModel = async ()  => {
    try {
        const [rows] = await connection.query('CALL GetAllProducts()');
        return rows[0]; 
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
}

//Para obtener un producto en específico por ID
// Utilizando un procedimiento almacenado llamado GetProductById
export const getProductByIdModel = async (productId) => {
    try {
        const [rows] = await connection.query('CALL GetProductById(?)', [productId]);
        return rows[0][0]; // Retorna el primer producto encontrado
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        throw error;
    }
}