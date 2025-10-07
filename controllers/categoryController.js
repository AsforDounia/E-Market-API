import { Category } from "../models/Index.js"

async function getAllCategories(req, res){
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function getCategoryById(req, res) {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


export { getAllCategories, getCategoryById }