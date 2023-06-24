import Book from '../domain/books/models/Book'

interface BookRepositoryInterface {
  createBook(bookData: Book): Promise<Book>
  getBookById(bookId: string): Promise<Book | null>
  updateBook(bookId: string, bookData: Book): Promise<Book | null>
  deleteBook(bookId: string): Promise<boolean>
  getAllBooks(): Promise<Book[]>
}

export default BookRepositoryInterface
