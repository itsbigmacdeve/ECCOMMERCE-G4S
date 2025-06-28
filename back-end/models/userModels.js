import {connection} from '../db.js';

//Para registrar un nuevo usuario
export const registerUserModel = async (username, passwordHash) => {
  const [result] = await connection.query(
    'CALL RegisterUser(?, ?)',
    [username, passwordHash]
  );
  return result;
};

//Para iniciar sesión y devolver un token JWT
export const getUserByUsernameModel = async (username) => {
  const [rows] = await connection.query(
    'CALL GetUserByUsername(?)',
    [username]
  );
  return rows[0][0]; // Devuelve el primer usuario encontrado
};
