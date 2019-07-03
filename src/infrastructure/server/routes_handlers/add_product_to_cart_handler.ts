import { Context } from 'koa'
import { addProductToCartController } from '@adapters/index'
import { InputPortAddProductRequest } from '@adapters/add_product_to_cart'
import { HTTPRequest } from '@adapters/boundaries'

export const addProductToCart = async (ctx: Context): Promise<void> => {
  const { request } = ctx

  const httpRequest: HTTPRequest<InputPortAddProductRequest> = {
    method: request.method,
    path: request.URL.toString(),
    body: request.body,
  }

  const response = await addProductToCartController(httpRequest)

  ctx.status = response.statusCode
  ctx.body = response.body
}
