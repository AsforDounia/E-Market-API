import express from 'express';

const categoryRoutes = express.Router();
import * as categoryController from '../controllers/categoryController.js';

// Récupérer tous les categories
categoryRoutes.get('/', categoryController.getAllCategories);

export default categoryRoutes