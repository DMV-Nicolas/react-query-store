import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Product } from "../interfaces/product"
import { createProduct } from "../services/actions"

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onMutate: async (data) => {
      const optimisticProduct: Product = {
        id: Math.random(),
        ...data,
        rating: { rate: 0, count: 0 },
      }

      queryClient.setQueryData(
        ["products", { filterKey: data.category }],
        (prev: Product[] | undefined) => {
          if (!prev) return [optimisticProduct]

          return [...prev, optimisticProduct]
        }
      )

      return {
        optimisticProduct,
      }
    },
    onSuccess: (product, _, context) => {
      queryClient.removeQueries({
        queryKey: ["product", context.optimisticProduct.id.toString()],
      })
      queryClient.setQueryData(
        ["products", { filterKey: product.category }],
        (prev: Product[] | undefined) => {
          if (!prev) return [product]

          return prev.map((productCache) =>
            productCache.id === context.optimisticProduct.id
              ? product
              : productCache
          )
        }
      )
    },
    onError: (_, variables, context) => {
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id.toString()],
      })
      queryClient.setQueryData(
        ["products", { filterKey: variables.category }],
        (prev: Product[] | undefined) => {
          if (!prev) return []

          return prev.filter(
            (productCache) => productCache.id !== context?.optimisticProduct.id
          )
        }
      )
    },
  })

  return {
    createProductMutation,
  }
}
