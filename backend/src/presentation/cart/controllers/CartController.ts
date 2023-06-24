import { Request, Response } from 'express'
import CartService from '../../../application/cart/CartService'
import CartItem from '../../../domain/cart/models/CartItem'

const createCart = async (req: Request, res: Response) => {
  try {
    const newCart = await CartService.createCart()
    res.status(201).json(newCart)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getCartById = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params
    const cart = await CartService.getCartById(cartId)
    if (cart) {
      res.json(cart)
    } else {
      res.status(404).json({ error: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params
    const cartData = req.body
    const updatedCart = await CartService.updateCart(cartId, cartData)
    if (updatedCart) {
      res.json(updatedCart)
    } else {
      res.status(404).json({ error: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params
    const result = await CartService.deleteCart(cartId)
    if (result) {
      res.json({ message: 'Cart deleted successfully' })
    } else {
      res.status(404).json({ error: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params
    const { book, quantity, subtotal } = req.body
    const item: CartItem = { book, quantity, subtotal }
    const updatedCart = await CartService.addItemToCart(cartId, item)
    if (updatedCart) {
      res.json(updatedCart)
    } else {
      res.status(404).json({ error: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, itemId } = req.params
    const updatedCart = await CartService.removeItemFromCart(cartId, itemId)
    if (updatedCart) {
      res.json(updatedCart)
    } else {
      res.status(404).json({ error: 'Cart not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const cartController = {
  createCart,
  getCartById,
  updateCart,
  deleteCart,
  addItemToCart,
  removeItemFromCart,
}

export default cartController
