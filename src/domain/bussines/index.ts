import { makeGetShoppingCartInteractor } from './get_shopping_cart'
import { makeAddProductToCartInteractor } from './add_product_to_cart'
import { makeProductRepository, makeShoppingCartRepository } from '@repositories/memory'

const shoppingCartRepository = makeShoppingCartRepository()
const productRepository = makeProductRepository()

const getShoppingCartInteractor = makeGetShoppingCartInteractor(shoppingCartRepository)
const addProductToCartInteractor = makeAddProductToCartInteractor(shoppingCartRepository, productRepository)

export { getShoppingCartInteractor, addProductToCartInteractor }
