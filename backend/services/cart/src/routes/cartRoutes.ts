import express from 'express'
import {
  createCart,
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
} from '../controllers/cartController'

const router = express.Router()

// Endpoint: POST /cart
router.post('/cart', createCart)

// Endpoint: GET /cart/:id
router.get('/cart/:id', getCart)

// Endpoint: POST /cart/:id/items
router.post('/cart/:id/items', addItemToCart)

// Endpoint: DELETE /cart/:id/items/:itemId
router.delete('/cart/:id/items/:itemId', removeItemFromCart)

// Endpoint: PATCH /cart/:id/items/:itemId
router.patch('/cart/:id/items/:itemId', updateCartItemQuantity)

// Endpoint: DELETE /cart/:id
router.delete('/cart/:id', clearCart)

export default router
