import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getUserSelector } from '../../redux/slices/userSlice'
import { withQuery } from '../HOCs/withQuery'
import ProductCard from '../ProductCard/ProductCard'
import Search from '../Search/Search'
import ProductPageStyles from './ProductPage.module.css'

function ProductPageInner({ products, search }) {
  const { token } = useSelector(getUserSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })

  if (products) {
    return (
      <div className={ProductPageStyles.ProductPage}>
        <div className={ProductPageStyles.search}><Search /></div>
        <h2 className={ProductPageStyles.header}>
          {search
            ? ('Товары по запросу')
            : ('Все товары')}
        </h2>
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
  const { token } = useSelector(getUserSelector)
  const search = useSelector(getSearchSelector)

  const {
    data: products,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [search, token],
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  })

  return (
    <ProductPageInnerWithQuery
      products={products}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      search={search}
    />
  )
}

export default ProductPage
