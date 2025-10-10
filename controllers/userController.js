import { User } from "../models/Index.js";

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res,next) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) throw new AppError("User not found", 404);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

async function createUser(req, res, next) {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) throw new AppError("Fullname, email, and password are required", 400);

        const existingUser = await User.findOne({ email });
        if (existingUser) throw new AppError("Email already in use", 400);

        const role = req.body.role || 'user';
        if (!['user', 'admin'].includes(role)) throw new AppError("Invalid role specified", 400);

        const user = await User.create({ fullname, email, password, role });

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}


async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) throw new AppError("User not found", 404);
        user.deletedAt = new Date();
        await user.save();
        res.status(200).json({ message: 'User soft-deleted' });
    }
    catch (err) {
        next(err);
    }
}

export { getAllUsers, getUserById, createUser, deleteUser };
