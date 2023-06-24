import express from 'express';
import CartController from '../../../cart/controllers/CartController'

const router = express.Router();

router.post('/carts', CartController.createCart);
router.get('/carts/:cartId', CartController.getCartById);
router.put('/carts/:cartId', CartController.updateCart);
router.delete('/carts/:cartId', CartController.deleteCart);
router.post('/carts/:cartId/items', CartController.addItemToCart);
router.delete('/carts/:cartId/items/:itemId', CartController.removeItemFromCart);

export default router;
