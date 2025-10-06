const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Récupérer tous les produits
router.get('/', productController.getAllProducts);

// Récupérer un produit par ID
router.get('/:id', productController.getProductById);



module.exports = router;