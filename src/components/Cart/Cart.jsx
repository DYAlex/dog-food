import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { getUserSelector } from '../../redux/slices/userSlice'
import { withQuery } from '../HOCs/withQuery'
import CartItem from './CartItem/CartItem'
import CartPageStyles from './Cart.module.css'

function CartPageInner({ products }) {
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
      <div className={CartPageStyles.ProductPage}>
        <h1 className={CartPageStyles.header}>Все товары</h1>
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
}

const CartPageInnerWithQuery = withQuery(CartPageInner)
function CartPage() {
  const { token } = useSelector(getUserSelector)
  const ids = []

  const {
    data: products,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products', token],
    queryFn: () => dogFoodApi.getProductsByIds(ids).then((d) => d.products),
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
