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


async function updateCategory(req, res, next) {
    try {
        const { id } = req.params;
        let { name, description } = req.body;

        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        if (name) {

            name = name.trim();

            if (!name) {
                return res.status(400).json({ message: 'Name cannot be empty' });
            }

            const existingCat = await Category.findOne({ name });
            if (existingCat && existingCat._id.toString() !== id) {
                return res.status(400).json({ message: 'Name already in use' });
            }
            category.name = name;
        }
        if (description) {
            description = description.trim();

            if (!description) {
                const error = new Error('Description cannot be empty');
                error.statusCode = 400;
                return next(error);
                // return res.status(400).json({ message: 'Description cannot be empty' });
            }
            category.description = description;
        }

        await category.save();

        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        category.deletedAt = new Date();
        await category.save();

        res.status(200).json({ message: 'Category soft-deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }