import {
  makeGetShoppingCartInteractor,
  GetShoppingCartRequestModel,
  GetShoppingCartResponseModel,
} from '../get_shopping_cart'
import { ShoppingCartRepository } from '@src/domain/entities/boundaries/shopping_cart_repository'
import { ShoppingCart } from '@src/domain/entities/shopping_cart'
import { makeShoppingCart } from '@src/domain/entities'
import { Interactor } from '../boundaries/interactor'

describe('Get Shopping Cart', (): void => {
  let getShoppingCartInteractor: Interactor<GetShoppingCartRequestModel, Promise<GetShoppingCartResponseModel>>,
    mockRepository: ShoppingCartRepository
  beforeAll((): void => {
    mockRepository = {
      getById: jest.fn(
        (cartId: string): Promise<ShoppingCart> => {
          if (cartId == 'dummyId') {
            return Promise.resolve(makeShoppingCart([]))
          } else {
            return Promise.reject(new Error('No shopping cart found'))
          }
        },
      ),
      save: (): Promise<string> => Promise.resolve('saved'),
      update: (): Promise<ShoppingCart> => Promise.resolve(makeShoppingCart([])),
    }

    getShoppingCartInteractor = makeGetShoppingCartInteractor(mockRepository)
  })

  test('given a shoppingCart id we can get a shopping cart from repository', async (): Promise<void> => {
    const requestModel: GetShoppingCartRequestModel = { shoppingCartId: 'dummyId' }

    const { shoppingCart } = await getShoppingCartInteractor.execute(requestModel)

    expect(mockRepository.getById).toHaveBeenCalled()
    expect(shoppingCart).toHaveProperty('id')
    expect(shoppingCart).toHaveProperty('totalPrice')
    expect(shoppingCart).toHaveProperty('items')
  })

  test('given a wrong shoppingCart id we can get a not found error', async (): Promise<void> => {
    const requestModel: GetShoppingCartRequestModel = { shoppingCartId: 'badId' }
    try {
      await getShoppingCartInteractor.execute(requestModel)
      throw new Error('This should not happend')
    } catch (error) {
      expect(error.message).toEqual('No shopping cart found')
    }
  })
})
