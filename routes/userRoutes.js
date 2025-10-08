import express from 'express';
import * as usertController from '../controllers/userController.js';
import { validate } from '../middlewares/validation/validate.js';
import { createUserSchema } from '../middlewares/validation/schemas/userSchema.js';

const usertRoutes = express.Router();

// Récupérer tous les utilisateurs
usertRoutes.get('/', usertController.getAllUsers);

// Récupérer un utilisateur par ID
usertRoutes.get('/:id', usertController.getUserById);

// Créer un nouvel utilisateur
usertRoutes.post('/',validate(createUserSchema), usertController.createUser);

// Supprimer un utilisateur (soft delete)
usertRoutes.delete('/:id', usertController.deleteUser);

export default usertRoutes;

// router.post('/register', , userController.register);
// router.post('/login', validate(loginSchema), userController.login);