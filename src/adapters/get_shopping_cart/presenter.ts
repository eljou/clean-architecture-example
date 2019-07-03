import { Presenter, HTTPResponse } from '../boundaries'
import { GetShoppingCartResponseModel } from '@domain/bussines/get_shopping_cart'

interface ShoppingCartOutputItem {
  quantity: number
  product: {
    sku: string
    name: string
    description: string
    image: string
    price: number
  }
}

interface GetShoppingCartOutputPortModel {
  id: string
  totalPrice: number
  totalAmountOfItems: number
  items: ShoppingCartOutputItem[]
}

export const getShoppingCartPresenter: Presenter<GetShoppingCartResponseModel> = (
  requestModel: GetShoppingCartResponseModel,
): HTTPResponse => {
  const outputModel: GetShoppingCartOutputPortModel = {
    id: requestModel.shoppingCart.id(),
    totalPrice: requestModel.shoppingCart.totalPrice(),
    totalAmountOfItems: requestModel.shoppingCart.totalQuantity(),
    items: requestModel.shoppingCart.items().map(
      (p): ShoppingCartOutputItem => ({
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
  }

  return {
    body: { shoppingCart: outputModel },
    statusCode: 200,
  }
}
