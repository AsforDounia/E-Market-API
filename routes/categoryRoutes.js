import express from 'express';

const categoryRoutes = express.Router();
import * as categoryController from '../controllers/categoryController.js';
import { validate } from '../middlewares/validate.js';
import { createCategorySchema, updateCategorySchema } from '../middlewares/schemas/categorySchema.js';

// Récupérer tous les categories
categoryRoutes.get('/', categoryController.getAllCategories);

// Récupérer un category par ID
categoryRoutes.get('/:id', categoryController.getCategoryById);

// Créer une nouvel categorie
categoryRoutes.post('/', validate(createCategorySchema), categoryController.createCategory);

// Mettre à jour une categorie existant
categoryRoutes.put('/:id', validate(updateCategorySchema), categoryController.updateCategory);

// Supprimer une categorie (soft delete)
categoryRoutes.delete('/:id', categoryController.deleteCategory);

export default categoryRoutes