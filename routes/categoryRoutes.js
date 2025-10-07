import express from 'express';

const categoryRoutes = express.Router();
import * as categoryController from '../controllers/categoryController.js';
import { validate } from '../middlewares/validate.js';
import { createCategorySchema } from '../middlewares/schemas/categorySchema.js';

// Récupérer tous les categories
categoryRoutes.get('/', categoryController.getAllCategories);

// Récupérer un category par ID
categoryRoutes.get('/:id', categoryController.getCategoryById);

// Créer une nouvel categorie
categoryRoutes.post('/', validate(createCategorySchema), categoryController.createCategory);


export default categoryRoutes