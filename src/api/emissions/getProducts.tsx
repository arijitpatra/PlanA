export type Product = {
  name: string,
  product_variable: string
}

const getProducts = async (): Promise<Array<Product>> => {
  const response = await fetch('https://api.v2.emissions-api.org/api/v2/products.json')
  return response.json() // TODO: Handle errors
}

export default getProducts