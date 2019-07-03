import faker from 'faker'

import { ProductRepository } from '@domain/entities/boundaries/'
import { Product } from '@domain/entities/product'
import { makeProduct } from '@domain/entities'

interface DBProduct {
  _id: number
  sku: string
  name: string
  description: string
  imageUrl: string
  price: number
}

export const makeProductRepository = (): ProductRepository => {
  const products: DBProduct[] = Array(3)
    .fill(null)
    .map(
      (v, i): DBProduct => ({
        _id: i,
        sku: faker.random.alphaNumeric(10),
        name: faker.commerce.product(),
        description: faker.commerce.productName(),
        imageUrl: faker.image.imageUrl(),
        price: faker.random.number({
          min: 1000,
          max: 999999,
        }),
      }),
    )

  console.log('Products:: ')
  products.forEach((p): void => console.log('-', p.sku, p.name), '\n')

  return {
    getById: (productId: string): Promise<Product> => {
      const product = products.find((p): boolean => p.sku === productId)
      if (product) {
        return Promise.resolve(
          makeProduct(product.sku, product.name, product.description, product.imageUrl, product.price),
        )
      }
      throw new Error('Product not found')
    },
    save: (product: Product): Promise<string> => {
      const dbProductModel: DBProduct = {
        _id: products.length,
        sku: product.sku(),
        name: product.name(),
        description: product.description(),
        imageUrl: product.imageUrl(),
        price: product.price(),
      }
      products.push(dbProductModel)

      return Promise.resolve(dbProductModel.sku)
    },
  }
}
