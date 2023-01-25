import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { useQueryContext } from '../../contexts/QueryContextProvider'
import { Loader } from '../Loader/Loader'
import ProductCard from '../ProductCard/ProductCard'
import ProductPageStyles from './ProductPage.module.css'

function ProductPage() {
  const { token } = useQueryContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      // console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })

  const {
    // data, isLoading, isError, error, refetch,
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => dogFoodApi.getAllProducts().then((d) => d.products),
  })

  if (isLoading) {
    return <Loader />
  }

  if (products) {
    // console.log('This is products from ProductPage', { products })
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

  return (
    <div className={ProductPageStyles.ProductPage}>
      <h1>Product Page</h1>
      <p>
        Произошла ошибка:
        {' '}
        {error}
      </p>
    </div>
  )
}

export default ProductPage
