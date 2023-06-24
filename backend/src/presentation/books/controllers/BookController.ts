import { Request, Response } from 'express'
import BookService from '../../../application/books/BookService'

const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, price, availability } = req.body
    const book = await BookService.createBook({
      title,
      author,
      description,
      price,
      availability,
    })
    res.status(201).json(book)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params
    const book = await BookService.getBookById(bookId)
    if (book) {
      res.json(book)
    } else {
      res.status(404).json({ error: 'Book not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params
    const { title, author, description, price, availability } = req.body
    const updatedBook = await BookService.updateBook(bookId, {
      title,
      author,
      description,
      price,
      availability,
    })
    if (updatedBook) {
      res.json(updatedBook)
    } else {
      res.status(404).json({ error: 'Book not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params
    const result = await BookService.deleteBook(bookId)
    if (result) {
      res.json({ success: true })
    } else {
      res.status(404).json({ error: 'Book not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await BookService.getAllBooks()
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default { createBook, getBookById, updateBook, deleteBook, getAllBooks }
