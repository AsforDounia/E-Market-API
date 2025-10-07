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


export { getAllCategories }