import { Document, Schema, model } from 'mongoose'
import { CartItem } from './cartItem'

export interface Cart extends Document {
  items: CartItem[]
}

const CartSchema = new Schema<Cart>({
  items: [{ type: Schema.Types.ObjectId, ref: 'CartItem', required: true }],
})

export default model<Cart>('Cart', CartSchema)
