import CartItem from './CartItem'

interface Cart {
  user: String
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

export default Cart
