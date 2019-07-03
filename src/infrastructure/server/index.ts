import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { getShoppingCartHandler } from './routes_handlers/get_shopping_cart_handler'
import { addProductToCart } from './routes_handlers/add_product_to_cart_handler'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/:shoppingCartId', getShoppingCartHandler)
router.post('/', addProductToCart)

app.use(router.routes()).use(router.allowedMethods())

export default app
