import { makeGetShoppingCartController, getShoppingCartPresenter } from './get_shopping_cart'
import { makeAddProductToCartController, addProductToCartPresenter } from './add_product_to_cart'
import { getShoppingCartInteractor, addProductToCartInteractor } from '@src/domain/bussines'

const getShoppingCartController = makeGetShoppingCartController(getShoppingCartInteractor, getShoppingCartPresenter)
const addProductToCartController = makeAddProductToCartController(addProductToCartInteractor, addProductToCartPresenter)

export { getShoppingCartController, addProductToCartController }
