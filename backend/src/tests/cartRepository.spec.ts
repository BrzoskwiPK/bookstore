import assert from 'assert'
import sinon from 'sinon'
import { CartModel } from '../adapters/mongodb/repositories/CartRepository'
import cartRepository from '../adapters/mongodb/repositories/CartRepository'
import CartItem from '../domain/cart/models/CartItem'

describe('cartRepository', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('createCart', () => {
    it('should create a new cart', async () => {
      const createStub = sinon.stub(CartModel, 'create').resolves({
        _id: 'cart123',
        user: 'testuser',
        items: [] as CartItem[],
        totalQuantity: 0,
        totalPrice: 0,
      } as any)

      const cartData = {
        user: 'testuser',
        items: [] as CartItem[],
        totalQuantity: 0,
        totalPrice: 0,
      }

      const cart = await cartRepository.createCart(cartData)

      assert.ok(
        createStub.calledOnceWith(cartData),
        'create method should be called with correct cart data',
      )
      assert.deepStrictEqual(cart, {
        _id: 'cart123',
        user: 'testuser',
        items: [] as CartItem[],
        totalQuantity: 0,
        totalPrice: 0,
      })

      createStub.restore()
    })
  })

  describe('getCartById', () => {
    it('should return null for non-existent cart ID', async () => {
      const cartId = 'nonexistentcart'

      const findByIdStub = sinon.stub(CartModel, 'findById').resolves(null)

      const cart = await cartRepository.getCartById(cartId)

      assert.ok(
        findByIdStub.calledOnceWith(cartId),
        'findById method should be called with correct cart ID',
      )
      assert.strictEqual(cart, null)

      findByIdStub.restore()
    })
  })

  describe('updateCart', () => {
    it('should return null for non-existent cart ID during update', async () => {
      const cartId = 'nonexistentcart'
      const cartData = {
        user: 'testuser',
        items: [] as CartItem[],
        totalQuantity: 0,
        totalPrice: 0,
      }

      const findByIdAndUpdateStub = sinon
        .stub(CartModel, 'findByIdAndUpdate')
        .resolves(null)

      const updatedCart = await cartRepository.updateCart(cartId, cartData)

      assert.ok(
        findByIdAndUpdateStub.calledOnceWith(cartId, cartData),
        'findByIdAndUpdate method should be called with correct cart ID, data, and options',
      )
      assert.strictEqual(updatedCart, null)

      findByIdAndUpdateStub.restore()
    })
  })

  describe('deleteCart', () => {
    it('should delete a cart', async () => {
      const cartId = 'cart123'

      const findByIdAndDeleteStub = sinon
        .stub(CartModel, 'findByIdAndDelete')
        .resolves({} as any)

      const result = await cartRepository.deleteCart(cartId)

      assert.ok(
        findByIdAndDeleteStub.calledOnceWith(cartId),
        'findByIdAndDelete method should be called with correct cart ID',
      )
      assert.strictEqual(result, true)

      findByIdAndDeleteStub.restore()
    })

    it('should return false for non-existent cart ID during deletion', async () => {
      const cartId = 'nonexistentcart'

      const findByIdAndDeleteStub = sinon
        .stub(CartModel, 'findByIdAndDelete')
        .resolves(null)

      const result = await cartRepository.deleteCart(cartId)

      assert.ok(
        findByIdAndDeleteStub.calledOnceWith(cartId),
        'findByIdAndDelete method should be called with correct cart ID',
      )
      assert.strictEqual(result, false)

      findByIdAndDeleteStub.restore()
    })
  })

  describe('addItemToCart', () => {
    it('should return null for non-existent cart ID during adding an item', async () => {
      const cartId = 'nonexistentcart'
      const item: CartItem = {
        book: {
          title: 'Sample Book',
          author: 'John Doe',
          description: 'Sample description',
          price: 19.99,
          availability: 'In Stock',
        },
        quantity: 1,
        subtotal: 10,
      }

      const findByIdAndUpdateStub = sinon
        .stub(CartModel, 'findByIdAndUpdate')
        .resolves(null)

      const updatedCart = await cartRepository.addItemToCart(cartId, item)

      assert.ok(
        findByIdAndUpdateStub.calledOnceWith(cartId, {
          $push: { items: item },
        }),
        'findByIdAndUpdate method should be called with correct cart ID, item, and options',
      )
      assert.strictEqual(updatedCart, null)

      findByIdAndUpdateStub.restore()
    })
  })

  describe('removeItemFromCart', () => {
    it('should return null for non-existent cart ID during removing an item', async () => {
      const cartId = 'nonexistentcart'
      const itemId = 'item123'

      const findByIdAndUpdateStub = sinon
        .stub(CartModel, 'findByIdAndUpdate')
        .resolves(null)

      const updatedCart = await cartRepository.removeItemFromCart(
        cartId,
        itemId,
      )

      assert.ok(
        findByIdAndUpdateStub.calledOnceWith(cartId, {
          $pull: { items: { _id: itemId } },
        }),
        'findByIdAndUpdate method should be called with correct cart ID, item ID, and options',
      )
      assert.strictEqual(updatedCart, null)

      findByIdAndUpdateStub.restore()
    })
  })
})
