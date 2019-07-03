import { Context } from 'koa'
import { getShoppingCartController } from '@adapters/index'
import { HTTPRequest } from '@adapters/boundaries'

export const getShoppingCartHandler = async (ctx: Context): Promise<void> => {
  const { request } = ctx

  const httpRequest: HTTPRequest<null> = {
    method: request.method,
    path: request.URL.toString(),
    params: ctx.params,
    body: null,
  }

  const response = await getShoppingCartController(httpRequest)

  ctx.status = response.statusCode
  ctx.body = response.body
}
