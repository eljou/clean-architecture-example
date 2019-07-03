import { Interactor } from './boundaries/interactor'
import { ShoppingCart } from '@src/domain/entities/shopping_cart'
import { ShoppingCartRepository } from '@src/domain/entities/boundaries/shopping_cart_repository'

export const makeRemoveProductFromCartInteractor = (
  shoppingCartRepository: ShoppingCartRepository,
): Interactor<AddProductRequestModel, Promise<AddProductResponseModel>> => ({
  execute: async ({
    shoppingCartId,
    productId,
    quantity,
  }: AddProductRequestModel): Promise<AddProductResponseModel> => {
    try {
      const shoppingCart = await shoppingCartRepository.getById(shoppingCartId)
      shoppingCart.removeProduct(productId, quantity)
      await shoppingCartRepository.update(shoppingCart)

      return {
        success: true,
        shoppingCart,
      }
    } catch (error) {
      throw error
    }
  },
})

export interface AddProductRequestModel {
  shoppingCartId: string
  productId: string
  quantity: number
}

export interface AddProductResponseModel {
  success: boolean
  shoppingCart: ShoppingCart
}
