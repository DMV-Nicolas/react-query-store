import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { ProductCard } from "../components/ProductCard"
import { useProduct } from "../hooks/useProduct"

export const ProductView = () => {
  const { id } = useParams()
  const { productsQuery } = useProduct({ id: id || "" })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {productsQuery.isLoading && (
        <p className="text-lg font-bold">Cargando...</p>
      )}

      {productsQuery.data && (
        <ProductCard product={productsQuery.data} fullDescription />
      )}
    </div>
  )
}
