import uuid from 'uuid/v4'
import { productMaker } from './product'
import { shoppingCartMaker } from './shopping_cart'

const makeProduct = productMaker()
const makeShoppingCart = shoppingCartMaker(uuid)

export { makeProduct, makeShoppingCart }
