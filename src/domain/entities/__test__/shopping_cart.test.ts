import faker from 'faker'
import { Product } from '../product'
import { makeShoppingCart, makeProduct } from '../'
import { CartItem, ShoppingCart } from '../shopping_cart'

describe('Shopping Cart Entitie', (): void => {
  let dummyProduct: Product, shoppingCartWithItems: ShoppingCart, listOfDummyItems: CartItem[]
  beforeAll((): void => {
    dummyProduct = makeProduct(
      faker.random.alphaNumeric(10),
      faker.commerce.product(),
      faker.commerce.productName(),
      faker.image.imageUrl(),
      4500,
    )
  })

  beforeEach((): void => {
    listOfDummyItems = ['', '', ''].map(
      (): CartItem => ({
        quantity: faker.random.number({ min: 2, max: 5 }),
        product: makeProduct(
          faker.random.alphaNumeric(10),
          faker.commerce.product(),
          faker.commerce.productName(),
          faker.image.imageUrl(),
          4500,
        ),
      }),
    )

    shoppingCartWithItems = makeShoppingCart(listOfDummyItems)
  })

  test('creates an empty shopping cart', (): void => {
    const shoppingCart = makeShoppingCart([])
    expect(shoppingCart.items()).toBeInstanceOf(Array)
    expect(shoppingCart.items().length).toEqual(0)
    expect(shoppingCart.totalQuantity()).toEqual(0)
    expect(shoppingCart.totalPrice()).toEqual(0)
  })

  test('creates an initialized shopping cart', (): void => {
    const totalQuantity = listOfDummyItems.reduce((acc, item): number => (acc += item.quantity), 0)
    const shoppingCart = makeShoppingCart(listOfDummyItems)

    expect(shoppingCart.items().length).toEqual(listOfDummyItems.length)
    expect(shoppingCart.totalQuantity()).toEqual(totalQuantity)
    expect(shoppingCart.items()[0].product.sku()).toEqual(listOfDummyItems[0].product.sku())
  })

  test('fails to create an initialized shopping cart when given item with negative quantity', (): void => {
    listOfDummyItems[0].quantity = -1
    try {
      makeShoppingCart(listOfDummyItems)
      throw new Error('This should not happend')
    } catch (error) {
      expect(error.message).toEqual('Cannot create a shooping cart with items with quantity 0')
    }
  })

  test('adds one product to cart', (): void => {
    const productToAdd = dummyProduct
    const shoppingCart = makeShoppingCart([])

    const updatedCart = shoppingCart.addProduct(productToAdd, 1)
    expect(updatedCart.length).toEqual(1)
    expect(updatedCart[0].product.sku()).toEqual(productToAdd.sku())
    expect(shoppingCart.totalQuantity()).toEqual(1)
    expect(shoppingCart.totalPrice()).toEqual(4500)
  })

  test('fails to add product with negative quantity to cart', (): void => {
    const productToAdd = dummyProduct
    const shoppingCart = makeShoppingCart([])

    try {
      shoppingCart.addProduct(productToAdd, -1)
      throw new Error('This should not happend')
    } catch (error) {
      expect(error.message).toEqual('Quantity of product to add can not be 0')
    }
  })

  test('removes one product from the cart and leaves de cart empty', (): void => {
    const shoppingCart = makeShoppingCart([
      {
        quantity: 1,
        product: dummyProduct,
      },
    ])

    const updatedCart = shoppingCart.removeProduct(dummyProduct.sku(), 1)
    expect(updatedCart.length).toEqual(0)
  })

  test('removes one product from the cart and leaves de cart with other items', (): void => {
    const totalQuantity = listOfDummyItems.reduce((acc, item): number => (acc += item.quantity), 0)
    shoppingCartWithItems.removeProduct(listOfDummyItems[0].product.sku(), 1)
    expect(shoppingCartWithItems.totalQuantity()).toEqual(totalQuantity - 1)
  })

  test('fails to remove more products from the cart than the ones on it', (): void => {
    try {
      shoppingCartWithItems.removeProduct(listOfDummyItems[0].product.sku(), 6)

      throw new Error('This should not happend')
    } catch (error) {
      expect(error.message).toEqual("You can't remove that amount of this product")
    }
  })

  test('fails to remove non existing product from the cart', (): void => {
    try {
      shoppingCartWithItems.removeProduct('badId', 2)

      throw new Error('This should not happend')
    } catch (error) {
      expect(error.message).toEqual('Item not present in shopping cart')
    }
  })

  test('clears cart', (): void => {
    const shoppingCart = makeShoppingCart([
      {
        quantity: 1,
        product: dummyProduct,
      },
    ])
    const updatedCart = shoppingCart.cleanCart()
    expect(updatedCart.length).toEqual(0)
    expect(shoppingCart.totalQuantity()).toEqual(0)
    expect(shoppingCart.totalPrice()).toEqual(0)
  })
})
