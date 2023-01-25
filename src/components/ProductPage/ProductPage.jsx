import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { useQueryContext } from '../../contexts/QueryContextProvider'
import { withQuery } from '../HOCs/withQuery'
import ProductCard from '../ProductCard/ProductCard'
import ProductPageStyles from './ProductPage.module.css'

function ProductPageInner({ products }) {
  const { token } = useQueryContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      // console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })

  if (products) {
    return (
      <div className={ProductPageStyles.ProductPage}>
        <h1 className={ProductPageStyles.header}>Все товары</h1>
        <div className={ProductPageStyles.container}>
          {products.map(({ _id: id, ...restProduct }) => (
            <ProductCard
              key={id}
              id={id}
              product={restProduct}
            />
          ))}
        </div>
      </div>
    )
  }
}

const ProductPageInnerWithQuery = withQuery(ProductPageInner)
function ProductPage() {
  const { token } = useQueryContext()

  const {
    data: products,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products', token],
    queryFn: () => dogFoodApi.getAllProducts().then((d) => d.products),
  })

  return (
    <ProductPageInnerWithQuery
      products={products}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    />
  )
}

export default ProductPage
