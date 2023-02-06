import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { getUserSelector } from '../../redux/slices/userSlice'
import { withQuery } from '../HOCs/withQuery'
import CartItem from './CartItem/CartItem'
import CartPageStyles from './Cart.module.css'
import { getCartSelector } from '../../redux/slices/cartSlice'

function CartPageInner({ products, isError }) {
  const { token } = useSelector(getUserSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })
  // console.log(products.length)

  if (products.length > 0) {
    // console.log({ products })
    return (
      <div className={CartPageStyles.CartPage}>
        <h1 className={CartPageStyles.header}>Корзина</h1>
        <div className={CartPageStyles.container}>
          {products.map(({ _id: id, ...restProduct }) => (
            <CartItem
              key={id}
              id={id}
              product={restProduct}
            />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return <p>Что-то пошло не так</p>
  }

  return (
    <div className={CartPageStyles.CartPage}>
      <h1 className={CartPageStyles.header}>Корзина</h1>
      <div className={CartPageStyles.containerEmpty}>
        <h3>Здесь пока ничего нет</h3>
        <Link to="/products">Наши товары</Link>
        <Link to="/profile">Личный кабинет</Link>
      </div>
    </div>
  )
}

const CartPageInnerWithQuery = withQuery(CartPageInner)

function CartPage() {
  const { token } = useSelector(getUserSelector)
  const cart = useSelector(getCartSelector)
  console.log({ cart })
  // console.log(cart.length)
  // console.log(Object.keys(cart))
  const ids = Object.keys(cart)
  console.log({ ids })
  console.log(ids.length)

  const {
    data: products,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cart', token],
    queryFn: () => dogFoodApi.getProductsByIds(ids),
  })

  return (
    <CartPageInnerWithQuery
      products={products}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    />
  )
}

export default CartPage
