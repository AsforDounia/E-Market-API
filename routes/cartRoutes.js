import express from 'express';
import * as cartController from '../controllers/cartController.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation/validate.js';
import {addToCartSchema, updateCartItemSchema} from "../middlewares/validation/schemas/cartSchemas.js";

const router = express.Router();

router.post('/add', authenticate, validate(addToCartSchema), cartController.addToCart);
router.get('/', authenticate, cartController.getCart);
router.put('/item/:productId', authenticate, validate(updateCartItemSchema), cartController.updateCartItem);
router.delete('/item/:productId', authenticate, cartController.removeFromCart);
router.delete('/', authenticate, cartController.clearCart);

export default router;