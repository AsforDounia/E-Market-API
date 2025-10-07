import { User } from "../models/Index.js";

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function createUser(req, res) {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'Fullname, email, and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const role = req.body.role || 'user';
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const user = await User.create({ fullname, email, password, role });

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
export { getAllUsers, getUserById, createUser };
