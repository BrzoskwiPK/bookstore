import mongoose, { Schema, Document, Model } from 'mongoose'
import Book from '../../../domain/books/models/Book'
import BookRepositoryInterface from '../../../interfaces/BookRepositoryInterface'

interface IBookDocument extends Book, Document {}

const bookSchema: Schema<IBookDocument> = new Schema<IBookDocument>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, required: true },
})

export const BookModel: Model<IBookDocument> = mongoose.model<IBookDocument>(
  'Book',
  bookSchema,
)

const createBook = async (bookData: Book): Promise<Book> => {
  const newBook = await BookModel.create(bookData)
  return newBook
}

const getBookById = async (bookId: string): Promise<Book | null> => {
  const book = await BookModel.findById(bookId)
  return book
}

const updateBook = async (
  bookId: string,
  bookData: Book,
): Promise<Book | null> => {
  const updatedBook = await BookModel.findByIdAndUpdate(bookId, bookData, {
    new: true,
  })
  return updatedBook
}

const deleteBook = async (bookId: string): Promise<boolean> => {
  const result = await BookModel.findByIdAndDelete(bookId)
  return !!result
}

const getAllBooks = async (): Promise<Book[]> => {
  const books = await BookModel.find()
  return books
}

export const bookRepository: BookRepositoryInterface = {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getAllBooks,
}
