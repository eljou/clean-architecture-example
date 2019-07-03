import { Product } from './product'

export interface CartItem {
  quantity: number
  product: Product
}

export interface ShoppingCart {
  id: () => string
  items: () => CartItem[]
  totalPrice: () => number
  totalQuantity: () => number
  addProduct: (product: Product, quantity: number) => CartItem[]
  removeProduct: (productId: string, quantity: number) => CartItem[]
  cleanCart: () => CartItem[]
}

type ShoppingCartMaker = (intialItems?: CartItem[]) => ShoppingCart
export const shoppingCartMaker = (makeUniqueId: () => string): ShoppingCartMaker => (
  intialItems: CartItem[] = [],
): ShoppingCart => {
  let items: CartItem[] = intialItems
  if (intialItems.filter((item): boolean => item.quantity <= 0).length > 0) {
    throw new Error('Cannot create a shooping cart with items with quantity 0')
  }

  const id: string = makeUniqueId()
  let [totalPrice, totalQuantity] = items.reduce(
    ([price, quantity], currentItem): [number, number] => {
      price += currentItem.product.price() * currentItem.quantity
      quantity += currentItem.quantity
      return [price, quantity]
    },
    [0, 0],
  )

  return {
    id: (): string => id,

    items: (): CartItem[] => items,

    totalPrice: (): number => totalPrice,

    totalQuantity: (): number => totalQuantity,

    addProduct: (product: Product, quantity: number = 1): CartItem[] => {
      if (quantity <= 0) {
        throw new Error('Quantity of product to add can not be 0')
      }

      totalQuantity += quantity
      totalPrice += product.price() * quantity
      if (!items.some((item): boolean => item.product.sku() === product.sku())) {
        items.push({ quantity, product })
      } else {
        items = items.map(
          (item): CartItem => {
            if (item.product.sku() === product.sku()) {
              item.quantity += quantity
            }

            return item
          },
        )
      }

      return items
    },

    removeProduct: (productId: string, quantity: number = 1): CartItem[] => {
      const productEqualityPredicate = (item: CartItem): boolean => item.product.sku() === productId

      if (!items.some(productEqualityPredicate)) {
        throw new Error('Item not present in shopping cart')
      }

      const producIndex = items.findIndex(productEqualityPredicate)
      if (items[producIndex].quantity < quantity) {
        throw new Error("You can't remove that amount of this product")
      }

      items[producIndex].quantity -= quantity
      totalQuantity -= quantity
      totalPrice -= items[producIndex].product.price()

      if (items[producIndex].quantity === 0) {
        items = items.filter((item): boolean => item.product.sku() !== productId)
      }

      return items
    },

    cleanCart: (): CartItem[] => {
      totalPrice = 0
      totalQuantity = 0
      items = []
      return items
    },
  }
}
