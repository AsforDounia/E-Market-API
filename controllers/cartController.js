import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { AppError } from '../middlewares/errorHandler.js';

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) throw new AppError('Product not found', 404);

    if (product.stock < quantity) throw new AppError('Insufficient stock', 400);

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();
    
    res.status(200).json({
      message: 'Product added to cart successfully',
      cart
    });
  } catch (error) {
    next(error);
  }
};