import { Document, Schema, model } from 'mongoose'

export interface CartItem extends Document {
  bookId: string
  quantity: number
}

const CartItemSchema = new Schema<CartItem>({
  bookId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
})

export default model<CartItem>('CartItem', CartItemSchema)
