import express from 'express'
import BookController from '../controllers/BookController'

const router = express.Router()

router.post('/books', BookController.createBook)
router.get('/books/:bookId', BookController.getBookById)
router.put('/books/:bookId', BookController.updateBook)
router.delete('/books/:bookId', BookController.deleteBook)
router.get('/books', BookController.getAllBooks)

export default router
