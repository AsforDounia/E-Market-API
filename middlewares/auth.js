import jwt from 'jsonwebtoken';
import { User } from '../models/Index.js';
import { AppError } from './errorHandler.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new AppError('Access denied. No token provided.', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) throw new AppError('Invalid token.', 401);

        req.user = user;
        next();
    } catch (error) {
        next(new AppError('Invalid token.', 401));
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Access denied. Insufficient permissions.', 403));
        }
        next();
    };
};