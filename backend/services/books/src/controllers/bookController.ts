import { Request, Response } from 'express'
import bookModel from '../models/bookModel'

/**
 * Retrieves a list of all books.
 *
 * @route GET /books
 * @returns {Array} - An array containing information about all books.
 */
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookModel.find()
    res.status(200).json(books).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

/**
 * Retrieves information about a book based on the provided identifier.
 *
 * @route GET /books/:id
 * @param {string} id - The identifier of the book.
 * @returns {Object} - An object containing information about the book.
 */
 export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params
  
    try {
      const book = await bookModel.findById(id)
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' })
      }
  
      res.status(200).json(book)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

/**
 * Adds a new book to the collection.
 *
 * @route POST /books
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {string} description - The description of the book.
 * @param {number} price - The price of the book.
 * @param {boolean} availability - The availability of the book.
 * @returns {Object} - An object containing information about the added book.
 */
export const addBook = async (req: Request, res: Response) => {
  const { title, author, description, price, availability } = req.body

  try {
    const newBook = new bookModel({
      title,
      author,
      description,
      price,
      availability,
    })

    const savedBook = await newBook.save()

    res.status(201).json(savedBook)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

/**
 * Deletes a book from the collection based on the provided identifier.
 *
 * @route DELETE /books/:id
 * @param {string} id - The identifier of the book.
 * @returns {Object} - An object confirming the deletion of the book.
 */
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await bookModel.findByIdAndDelete(id)
    res.status(204).json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

/**
 * Updates information about a book based on the provided identifier.
 *
 * @route PUT /books/:id
 * @param {string} id - The identifier of the book.
 * @param {string} title - The new title of the book.
 * @param {string} author - The new author of the book.
 * @param {string} description - The new description of the book.
 * @param {number} price - The new price of the book.
 * @param {boolean} availability - The new availability of the book.
 * @returns {Object} - An object containing updated information about the book.
 */
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, author, description, price, availability } = req.body

  try {
    const book = await bookModel.findByIdAndUpdate(
      id,
      { title, author, description, price, availability },
      { new: true },
    )

    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }

    res.json(book)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}