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

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const categories = await getProductCategories(product._id);

        res.json({
            _id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl,
            categories
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function createProduct(req, res) {
    try {
        const { title, description, price, stock, imageUrl, categoryIds } = req.body;
        if (!title || !description || price == null || stock == null) {
            return res.status(400).json({ message: 'Title, description, price, and stock are required' });
        }
        const product = new Product({ title, description, price, stock, imageUrl });
        await product.save();
        if (Array.isArray(categoryIds)) {
            for (const categoryId of categoryIds) {
                await ProductCategory.create({ product: product._id, category: categoryId });
            }
        }
        res.status(201).json({ message: 'Product created', data: product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { getAllProducts, getProductById, createProduct };
