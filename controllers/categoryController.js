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

async function createCategory(req, res) {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: 'name and description are required' });
        }

        const existingCat = await Category.findOne({ name });
        if (existingCat) {
            return res.status(400).json({ message: 'Name already in use' });
        }


        const category = await Category.create({ name, description });

        res.status(201).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export { getAllCategories, getCategoryById, createCategory }