import { Interactor } from './boundaries/interactor'
import { ShoppingCart } from '@domain/entities/shopping_cart'
import { ShoppingCartRepository } from '@domain/entities/boundaries'

export const makeGetShoppingCartInteractor = (
  shoppingCartRepository: ShoppingCartRepository,
): Interactor<GetShoppingCartRequestModel, Promise<GetShoppingCartResponseModel>> => ({
  execute: async ({ shoppingCartId }: GetShoppingCartRequestModel): Promise<GetShoppingCartResponseModel> => {
    try {
      const shoppingCart = await shoppingCartRepository.getById(shoppingCartId)

      return {
        shoppingCart,
      }
    } catch (error) {
      throw error
    }
  },
})

export interface GetShoppingCartRequestModel {
  shoppingCartId: string
}

export interface GetShoppingCartResponseModel {
  shoppingCart: ShoppingCart
}
