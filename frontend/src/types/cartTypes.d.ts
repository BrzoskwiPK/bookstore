interface CartItem {
  book: Book
  quantity: number
  subtotal: number
}

interface Cart {
  user: string
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

type AddToCartAction = {
  type: 'ADD_TO_CART'
  payload: CartItem
}

type RemoveFromCartAction = {
  type: 'REMOVE_FROM_CART'
  payload: CartItem
}
