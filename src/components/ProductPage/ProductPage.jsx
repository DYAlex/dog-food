import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryContext } from '../../contexts/QueryContextProvider'
import ProductCard from '../ProductCard/ProductCard'
import ProductPageStyles from './ProductPage.module.css'

function ProductPage() {
  const { token } = useContext(QueryContext)
  const navigate = useNavigate()

  if (!token) {
    console.log('Redirecting to SignIn page')
    // navigate('/signin')
    useEffect(() => navigate('/signin'))
    return null
  }

  const {
    // data, isLoading, isError, error, refetch,
    data: products,
    error,
  } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при входе в Личный кабинет. 
      Проверьте отправляемые данные. Status: ${res.status}`)
      }

      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении ответа от сервера. 
      Попробуйте сделать запрос позже. Status: ${res.status}`)
      }

      return res.json()
    }).then((d) => d.products),
  })
  // console.log({ data })
  // const { products } = data
  // console.log({ products })
  // products.forEach((product) => console.log({ product }))

  if (products) {
    return (
      <div className={ProductPageStyles.ProductPage}>
        <h1 className={ProductPageStyles.header}>Все товары</h1>
        <div className={ProductPageStyles.container}>
          {products.map((product) => (
            <ProductCard
              key={crypto.randomUUID()}
              product={product}
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
        Произошла ошибка:&nbps;
        {error}
      </p>
      {/* <p>{JSON.stringify(products)}</p> */}
    </div>
  )
}

export default ProductPage
