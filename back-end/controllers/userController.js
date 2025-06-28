import {registerUserModel , getUserByUsernameModel} from '../models/userModels.js';

import bcrypt from 'bcrypt';


export const registerUserController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await registerUserModel(username, passwordHash);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const loginUserController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsernameModel(username);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno al iniciar sesión' });
  }
};