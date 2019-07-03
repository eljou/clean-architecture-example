import { Controller, Presenter, HTTPResponse } from '../boundaries'
import { Interactor } from '@domain/bussines/boundaries/'
import { AddProductRequestModel, AddProductResponseModel } from '@domain/bussines/add_product_to_cart'

export interface InputPortAddProductRequest {
  productId: string
  shoppingCartId: string
  quantity: number
}

export const makeAddProductToCartController = (
  interactor: Interactor<AddProductRequestModel, Promise<AddProductResponseModel>>,
  presenter: Presenter<AddProductResponseModel>,
): Controller<InputPortAddProductRequest> => async (request): Promise<HTTPResponse> => {
  if (!request.body || !request.body.productId || !request.body.shoppingCartId || !request.body.quantity) {
    return {
      statusCode: 400,
      body: {
        error: new Error('Input params must be provided, productId, shoppingCartId, quantity'),
      },
    }
  }

  const requestModel: AddProductRequestModel = {
    productId: request.body.productId,
    shoppingCartId: request.body.shoppingCartId,
    quantity: request.body.quantity,
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
