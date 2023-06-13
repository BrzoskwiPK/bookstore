import { Router } from 'express'
import { addBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/bookController'

const router = Router()

router.get('/books', getBooks)
router.get('/books/:id', getBook)
router.post('/books', addBook)
router.put('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)

export default router
