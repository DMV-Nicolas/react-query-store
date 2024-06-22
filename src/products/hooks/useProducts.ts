import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/actions"

interface Options {
  filterKey?: string
}

export function useProducts({ filterKey }: Options = {}) {
  const productsQuery = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60,
  })

  return { productsQuery }
}
