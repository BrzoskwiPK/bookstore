import { Request, Response } from 'express'
import CartModel, { Cart } from '../models/cartModel'
import CartItemModel, { CartItem } from '../models/cartItem'

export const createCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cart: Cart = await CartModel.create({ items: [] })
    res.status(201).json({ message: 'Cart created', cart })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart: Cart | null = await CartModel.findById(req.params.id).populate(
      'items',
    )

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const addItemToCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { bookId, quantity } = req.body
  try {
    const item: CartItem = await CartItemModel.create({ bookId, quantity })
    const cart: Cart | null = await CartModel.findById(req.params.id)
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    cart.items.push(item)
    await cart.save()
    res.status(201).json({ message: 'Item added to the cart', item })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const removeItemFromCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cart: Cart | null = await CartModel.findById(req.params.id)
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    const itemId = req.params.itemId
    cart.items = cart.items.filter((item: CartItem) => item._id !== itemId)
    await cart.save()
    res.json({ message: 'Item deleted from the cart' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateCartItemQuantity = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { quantity } = req.body
    const cart: Cart | null = await CartModel.findById(req.params.id)
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    const itemId = req.params.itemId
    const item: CartItem | undefined = cart.items.find(
      (i: CartItem) => i._id === itemId,
    )
    if (!item) {
      res.status(404).json({ message: 'Item not found in the cart' })
      return
    }
    item.quantity = quantity
    await cart.save()
    res.json({ message: 'Quantity updated' })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart: Cart | null = await CartModel.findById(req.params.id)
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    cart.items = []
    await cart.save()
    res.json({ message: 'Cart is cleared' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
