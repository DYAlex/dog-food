import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getUserSelector } from '../../redux/slices/userSlice'
import { FILTER_QUERY_NAME, getFilteredProducts } from '../Filters/constants'
import { Filters } from '../Filters/Filters'
import { withQuery } from '../HOCs/withQuery'
import ProductCard from '../ProductCard/ProductCard'
import Search from '../Search/Search'
import ProductPageStyles from './ProductPage.module.css'

function ProductPageInner({ products, search }) {
  if (products) {
    return (
      <div className={ProductPageStyles.ProductPage}>
        <div className={ProductPageStyles.search}><Search /></div>
        <div className={ProductPageStyles.filters}><Filters /></div>
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
  const navigate = useNavigate()
  const search = useSelector(getSearchSelector)
  const [searchParams] = useSearchParams()
  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)

  useEffect(() => {
    if (!token) {
      // console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  }, [token])

  const {
    data = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [search, token],
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  })

  let products = data

  if (currentFilterNameFromQuery) {
    products = getFilteredProducts(data, currentFilterNameFromQuery)
  }

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
