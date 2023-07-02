import assert from 'assert'
import sinon from 'sinon'
import {
  BookModel,
  bookRepository,
} from '../adapters/mongodb/repositories/BookRepository'

describe('bookRepository', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('createBook', () => {
    it('should create a new book', async () => {
      const createStub = sinon.stub(BookModel, 'create').resolves({
        _id: 'book123',
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        price: 9.99,
        availability: 'available',
      } as any)

      const bookData = {
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        price: 9.99,
        availability: 'available',
      }

      const book = await bookRepository.createBook(bookData)

      assert.ok(
        createStub.calledOnceWith(bookData),
        'create method should be called with correct book data',
      )
      assert.deepStrictEqual(book, {
        _id: 'book123',
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        price: 9.99,
        availability: 'available',
      })

      createStub.restore()
    })
  })

  describe('getBookById', () => {
    it('should return a book by its ID', async () => {
      const bookData = {
        _id: 'book123',
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        price: 9.99,
        availability: 'available',
      }

      const findByIdStub = sinon
        .stub(BookModel, 'findById')
        .resolves(bookData as any)

      const book = await bookRepository.getBookById('book123')

      assert.ok(
        findByIdStub.calledOnceWith('book123'),
        'findById method should be called with correct book ID',
      )
      assert.deepStrictEqual(book, bookData)

      findByIdStub.restore()
    })
  })

  it('should return null for non-existent book ID', async () => {
    const findByIdStub = sinon.stub(BookModel, 'findById').resolves(null)

    const book = await bookRepository.getBookById('book123')

    assert.ok(
      findByIdStub.calledOnceWith('book123'),
      'findById method should be called with correct book ID',
    )
    assert.strictEqual(book, null)

    findByIdStub.restore()
  })
})
