import express from 'express';
import * as usertController from '../controllers/userController.js';

const usertRoutes = express.Router();

// Récupérer tous les utilisateurs
usertRoutes.get('/', usertController.getAllUsers);

// Récupérer un utilisateur par ID
usertRoutes.get('/:id', usertController.getUserById);

// Créer un nouvel utilisateur
usertRoutes.post('/', usertController.createUser);

export default usertRoutes;