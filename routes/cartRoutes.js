import express from 'express';
import * as cartController from '../controllers/cartController.js';
import { authenticate } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation/validate.js';
import {addToCartSchema} from "../middlewares/validation/schemas/cartSchemas.js";

const router = express.Router();

router.post('/add', authenticate, validate(addToCartSchema), cartController.addToCart);

export default router;