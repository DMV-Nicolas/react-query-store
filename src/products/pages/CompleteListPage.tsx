import { ProductList } from ".."
import { useProducts } from "../hooks/useProducts"

export const CompleteListPage = () => {
  const { productsQuery } = useProducts()
  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      {productsQuery.isLoading && (
        <p className="text-lg font-bold">Cargando...</p>
      )}

      <ProductList products={productsQuery.data || []} />
    </div>
  )
}
