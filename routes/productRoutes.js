import express from 'express';

const productRoutes = express.Router();
import * as productController from '../controllers/productController.js';
import { validate } from '../middlewares/validate.js';
import { createProductSchema } from '../middlewares/schemas/productSchema.js';

// Récupérer tous les produits
productRoutes.get('/', productController.getAllProducts);

// Récupérer un produit par ID
productRoutes.get('/:id', productController.getProductById);

// Créer un nouveau produit
productRoutes.post('/',validate( createProductSchema ) , productController.createProduct);

// Mettre à jour un produit existant
productRoutes.put('/:id', productController.updateProduct);

// Supprimer un produit
productRoutes.delete('/:id', productController.deleteProduct);


export default productRoutes;