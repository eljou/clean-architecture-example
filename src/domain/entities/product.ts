export interface Product {
  sku: () => string
  name: () => string
  description: () => string
  imageUrl: () => string
  price: () => number
}

type ProductMaker = (sku: string, name: string, description: string, imageUrl: string, price: number) => Product
export const productMaker = (): ProductMaker => (
  sku: string,
  name: string,
  description: string = '',
  imageUrl: string = 'http://defaultimage.com',
  price: number,
): Product => {
  if (sku.length !== 10 || name.length <= 2 || price <= 0) {
    throw new Error(`Invalid Product Properties sku::${sku}, name::${name}, price::${price}`)
  }
  const _sku = sku
  const _name = name
  const _description = description
  const _imageUrl = imageUrl
  const _price = price

  return {
    sku: (): string => _sku,
    name: (): string => _name,
    description: (): string => _description,
    imageUrl: (): string => _imageUrl,
    price: (): number => _price,
  }
}
