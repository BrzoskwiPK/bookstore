import Cart from '../domain/cart/models/Cart'
import CartItem from '../domain/cart/models/CartItem'

interface CartRepositoryInterface {
  getCartById(cartId: string): Promise<Cart | null>
  getUserCarts(username: string): Promise<Cart[] | null>
  createCart(cartData: Cart): Promise<Cart>
  updateCart(cartId: string, cartData: Cart): Promise<Cart | null>
  deleteCart(cartId: string): Promise<boolean>
  addItemToCart(cartId: string, item: CartItem): Promise<Cart | null>
  removeItemFromCart(cartId: string, itemId: string): Promise<Cart | null>
}

export default CartRepositoryInterface
