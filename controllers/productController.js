const { Product, ProductCategory } = require('../models/Index');
const { getProductCategories } = require('../services/productService');

async function getAllProducts(req, res) {
    try {
        const products = await Product.find();

        const results = await Promise.all(
            products.map(async (product) => {
                const categories = await getProductCategories(product._id);
                return {
                    _id: product._id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    imageUrl: product.imageUrl,
                    categories
                };
            })
        );

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}



module.exports = { getAllProducts };
