import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: Cart = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>): Cart => {
      const existingItem = state.items.find(
        item => item.book.title === action.payload.book.title,
      )
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
        existingItem.subtotal += action.payload.subtotal
      } else {
        state.items.push(action.payload)
      }
      state.totalQuantity += action.payload.quantity
      state.totalPrice += action.payload.subtotal

      return state
    },
    removeFromCart: (state, action: PayloadAction<CartItem>): Cart => {
      return {
        ...state,
        items: state.items.filter(
          item => item.book.title !== action.payload.book.title,
        ),
        totalQuantity: state.totalQuantity - action.payload.quantity,
        totalPrice: state.totalPrice - action.payload.subtotal,
      }
    },
    clearCart: state => {
      return initialState
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
