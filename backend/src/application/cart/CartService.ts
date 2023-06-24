import CartRepository from '../../adapters/mongodb/repositories/CartRepository'
import Cart from '../../domain/cart/models/Cart'
import CartItem from '../../domain/cart/models/CartItem'

const createCart = async (): Promise<Cart> => {
  const cartData: Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  }

  const newCart = await CartRepository.createCart(cartData)

  return newCart
}

const getCartById = async (cartId: string): Promise<Cart | null> => {
  const cart = await CartRepository.getCartById(cartId)
  return cart
}

const updateCart = async (
  cartId: string,
  cartData: Cart,
): Promise<Cart | null> => {
  const updatedCart = await CartRepository.updateCart(cartId, cartData)
  return updatedCart
}

const deleteCart = async (cartId: string): Promise<boolean> => {
  const result = await CartRepository.deleteCart(cartId)
  return result
}

const addItemToCart = async (
  cartId: string,
  item: CartItem,
): Promise<Cart | null> => {
  const updatedCart = await CartRepository.addItemToCart(cartId, item)
  return updatedCart
}

const removeItemFromCart = async (
  cartId: string,
  itemId: string,
): Promise<Cart | null> => {
  const updatedCart = await CartRepository.removeItemFromCart(cartId, itemId)
  return updatedCart
}

const cartService = {
  createCart,
  getCartById,
  updateCart,
  deleteCart,
  addItemToCart,
  removeItemFromCart,
}

export default cartService
