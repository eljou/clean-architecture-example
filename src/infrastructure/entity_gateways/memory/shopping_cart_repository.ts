import { ShoppingCartRepository } from '@domain/entities/boundaries/shopping_cart_repository'
import { ShoppingCart } from '@domain/entities/shopping_cart'

export const makeShoppingCartRepository = (): ShoppingCartRepository => {
  console.log('instanciating - shopping cart')
  let carts: ShoppingCart[] = []

  return {
    getById: (cartId: string): Promise<ShoppingCart> => {
      const shoppingCart = carts.find((cart): boolean => cart.id() === cartId)
      if (shoppingCart) {
        return Promise.resolve(shoppingCart)
      }
      throw new Error('Shopping Cart not found')
    },
    save: (shoppingCart: ShoppingCart): Promise<string> => {
      console.log(shoppingCart)
      return Promise.resolve('')
    },
    update: (updatedShoppingCart: ShoppingCart): Promise<ShoppingCart> => {
      const oldShoppingCartIndex = carts.findIndex((s): boolean => updatedShoppingCart.id() === s.id())
      carts = [...carts.slice(0, oldShoppingCartIndex), updatedShoppingCart, ...carts.slice(oldShoppingCartIndex + 1)]

      return Promise.resolve(updatedShoppingCart)
    },
  }
}
