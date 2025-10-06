const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Récupérer tous les produits
router.get('/', productController.getAllProducts);

// Récupérer un produit par ID
router.get('/:id', productController.getProductById);

// Créer un nouveau produit
router.post('/', productController.createProduct);

// Mettre à jour un produit existant
router.put('/:id', productController.updateProduct);

// Supprimer un produit
router.delete('/:id', productController.deleteProduct);

module.exports = router;