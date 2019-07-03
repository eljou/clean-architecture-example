import { ShoppingCart } from '../shopping_cart'

export interface ShoppingCartRepository {
  getById: (cartId: string) => Promise<ShoppingCart>
  save: (shoppingCart: ShoppingCart) => Promise<string>
  update: (updatedShoppingCart: ShoppingCart) => Promise<ShoppingCart>
}
