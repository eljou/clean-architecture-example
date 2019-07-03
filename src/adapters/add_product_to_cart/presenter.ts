import { Presenter, HTTPResponse } from '../boundaries'
import { AddProductResponseModel } from '@domain/bussines/add_product_to_cart'

interface AddProductOutputPortModel {
  quantity: number
  product: {
    sku: string
    name: string
    description: string
    image: string
    price: number
  }
}

export const addProductToCartPresenter: Presenter<AddProductResponseModel> = (
  requestModel: AddProductResponseModel,
): HTTPResponse => {
  return {
    body: {
      success: requestModel.success,
      shoppingCart: {
        id: requestModel.shoppingCart.id(),
        totalPrice: requestModel.shoppingCart.totalPrice(),
        totalAmountOfItems: requestModel.shoppingCart.totalQuantity(),
        items: requestModel.shoppingCart.items().map(
          (p): AddProductOutputPortModel => ({
            quantity: p.quantity,
            product: {
              sku: p.product.sku(),
              name: p.product.name(),
              description: p.product.description(),
              image: p.product.imageUrl(),
              price: p.product.price(),
            },
          }),
        ),
      },
    },
    statusCode: 200,
  }
}
