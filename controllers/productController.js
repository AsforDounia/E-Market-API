const { Product, ProductCategory } = require('../models/Index');

async function getAllProducts(req, res) {
    try {
        const products = await Product.find();

        const results = await Promise.all(
            products.map(async (product) => {

                const links = await ProductCategory.find({ product: product._id }).populate({ path: 'category', strictPopulate: false });

                const categories = links.map(link => link.category);

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
