import { useQueryClient } from "@tanstack/react-query"
import { getProduct } from "../services/actions"

export function usePreFetchProduct() {
  const queryClient = useQueryClient()

  const preFetchProduct = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => getProduct(id),
      staleTime: 1000 * 60 * 60,
    })
  }

  return { preFetchProduct }
}
