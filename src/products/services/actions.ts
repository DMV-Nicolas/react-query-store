import { Product, productsApi } from ".."
import { sleep } from "../../utilities/sleep"

interface GetProductsOptions {
  filterKey?: string
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  await sleep(2000)
  const params = new URLSearchParams()
  if (filterKey) {
    params.append("category", filterKey)
  }

  const { data } = await productsApi.get<Product[]>("/products", {
    params,
  })
  return data
}

export const getProduct = async (id: string) => {
  await sleep(2000)
  const { data } = await productsApi.get<Product>(`/products/${id}`)
  return data
}
