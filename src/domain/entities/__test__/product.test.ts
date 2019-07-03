import { makeProduct } from '../'

describe('Product Entitie', (): void => {
  test('creates a product succesfully', (): void => {
    const product = makeProduct(
      'K012345789',
      'Mistral Ice',
      'Bottle of MistralIce drink',
      'http://products.com/0130',
      3300,
    )

    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('sku')
    expect(product).toHaveProperty('imageUrl')
    expect(product).toHaveProperty('price')
    expect(product.name()).toBe('Mistral Ice')
  })

  test('fails to create a product with a bad sku', (): void => {
    const sku = ''
    const name = 'Mistral Ice'
    const description = 'Bottle of MistralIce drink'
    const price = 3399

    try {
      makeProduct(sku, name, description, 'http://products.com/0130', price)

      throw new Error('This should not happend')
    } catch (error) {
      expect(error.message).toBe(`Invalid Product Properties sku::${sku}, name::${name}, price::${price}`)
    }
  })

  test('fails to create a product with price 0', (): void => {
    const sku = 'K012345789'
    const name = 'Mistral Ice'
    const description = 'Bottle of MistralIce drink'
    const price = 0

    try {
      makeProduct(sku, name, description, 'http://products.com/0130', price)

      throw new Error('This should not happend')
    } catch (error) {
      expect(error.message).toBe(`Invalid Product Properties sku::${sku}, name::${name}, price::${price}`)
    }
  })
})
