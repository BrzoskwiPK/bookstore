import { Schema } from 'mongoose'
import CartItem from './CartItem'

interface Cart {
  user: Schema.Types.ObjectId
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

export default Cart
