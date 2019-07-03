import { Product } from '../product'

export interface ProductRepository {
  getById: (productId: string) => Promise<Product>
  save: (product: Product) => Promise<string>
}
