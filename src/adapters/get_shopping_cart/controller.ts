import { Controller, Presenter, HTTPResponse } from '../boundaries'
import { Interactor } from '@domain/bussines/boundaries'
import { GetShoppingCartRequestModel, GetShoppingCartResponseModel } from '@domain/bussines/get_shopping_cart'

export const makeGetShoppingCartController = (
  interactor: Interactor<GetShoppingCartRequestModel, Promise<GetShoppingCartResponseModel>>,
  presenter: Presenter<GetShoppingCartResponseModel>,
): Controller<null> => async (request): Promise<HTTPResponse> => {
  if (!request.params || !request.params.shoppingCartId) {
    return {
      statusCode: 400,
      body: {
        error: new Error('Shopping cart id must be provided'),
      },
    }
  }

  const requestModel: GetShoppingCartRequestModel = {
    shoppingCartId: request.params.shoppingCartId.toString(), //types example
  }

  try {
    const response = await interactor.execute(requestModel)
    return presenter(response)
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: error.toString() },
    }
  }
}
