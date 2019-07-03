import { Interactor } from './boundaries'
import { makeShoppingCart } from '../entities'
import { ShoppingCart } from '@domain/entities/shopping_cart'
import { ShoppingCartRepository, ProductRepository } from '@domain/entities/boundaries'

export const makeAddProductToCartInteractor = (
  shoppingCartRepository: ShoppingCartRepository,
  productRepository: ProductRepository,
): Interactor<AddProductRequestModel, Promise<AddProductResponseModel>> => ({
  execute: async ({
    shoppingCartId,
    quantity,
    productId,
  }: AddProductRequestModel): Promise<AddProductResponseModel> => {
    try {
      const productToAdd = await productRepository.getById(productId)

      let shoppingCart
      try {
        shoppingCart = await shoppingCartRepository.getById(shoppingCartId)
      } catch (error) {
        if (error.message === 'Shopping Cart not found') {
          shoppingCart = makeShoppingCart([])
        } else {
          throw error
        }
      }

      shoppingCart.addProduct(productToAdd, quantity)
      await shoppingCartRepository.update(shoppingCart)

      return {
        success: true,
        shoppingCart,
      }
    } catch (error) {
      // relanzar el tipo de error que convenga
      throw error
    }
  },
})

export interface AddProductRequestModel {
  shoppingCartId: string
  quantity: number
  productId: string
}

export interface AddProductResponseModel {
  success: boolean
  shoppingCart: ShoppingCart
}
