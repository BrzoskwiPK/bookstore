import Book from '../../books/models/Book'

interface CartItem {
  book: Book
  quantity: number
  subtotal: number
}

export default CartItem
