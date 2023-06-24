import CartItem from './CartItem'

interface Cart {
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

export default Cart
