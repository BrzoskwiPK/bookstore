import Book from '../../domain/books/models/Book'
import { bookRepository } from '../../adapters/mongodb/repositories/BookRepository'

const createBook = async (bookData: Book): Promise<Book> => {
  const newBook = await bookRepository.createBook(bookData)
  return newBook
}

const getBookById = async (bookId: string): Promise<Book | null> => {
  const book = await bookRepository.getBookById(bookId)
  return book
}

const updateBook = async (
  bookId: string,
  bookData: Book,
): Promise<Book | null> => {
  const updatedBook = await bookRepository.updateBook(bookId, bookData)
  return updatedBook
}

const deleteBook = async (bookId: string): Promise<boolean> => {
  const result = await bookRepository.deleteBook(bookId)
  return result
}

const getAllBooks = async (): Promise<Book[]> => {
  const books = await bookRepository.getAllBooks()
  return books
}

export default {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getAllBooks,
}
