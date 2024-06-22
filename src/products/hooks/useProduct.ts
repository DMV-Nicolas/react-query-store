import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../services/actions"

interface Options {
  id: string
}

export function useProduct({ id }: Options) {
  const productsQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 60,
  })

  return { productsQuery }
}
