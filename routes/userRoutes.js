import express from 'express';
import * as usertController from '../controllers/userController.js';

const usertRoutes = express.Router();

// Récupérer tous les utilisateurs
usertRoutes.get('/', usertController.getAllUsers);




export default usertRoutes;