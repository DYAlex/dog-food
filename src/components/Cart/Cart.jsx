import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { getUserSelector } from '../../redux/slices/userSlice'
import { withQuery } from '../HOCs/withQuery'
import CartItem from './CartItem/CartItem'
import CartPageStyles from './Cart.module.css'
import {
  checkAll,
  uncheckAll,
  getCartSelector,
  deleteCheckedFromCart,
} from '../../redux/slices/cartSlice'

function CartPageInner({
  token, ids, cart, products, isError,
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  }, [token])
  // console.log(products.length)
  const totalItems = Object.keys(cart).reduce((acc, cartItem) => {
    if (cart[cartItem].isChecked) {
      // console.log(`${cartItem} ${cart[cartItem].count}`)
      const sum = acc + cart[cartItem].count
      return sum
    }
    return acc
  }, 0)
  // console.log('Cart length', Object.keys(cart).length)
  // console.log('totalItems', totalItems)
  const allChecked = Object.keys(cart).reduce((acc, cartItem) => {
    // console.log(cart[cartItem].isChecked)
    if (!cart[cartItem].isChecked) {
      return false
    }
    return acc
  }, true)
  // console.log({ allChecked })

  const checkAllHandler = () => {
    if (!allChecked) {
      // console.log('All checked now')
      dispatch(checkAll(ids))
    } else {
      // console.log('All UNchecked')
      dispatch(uncheckAll(ids))
    }
  }

  const deleteCheckedFromCartHandler = () => {
    console.log('deleteCheckedFromCartHandler clicked')
    dispatch(deleteCheckedFromCart())
  }

  if (products.length > 0) {
    return (
      <div className={CartPageStyles.CartPage}>
        <h1 className={CartPageStyles.header}>Корзина</h1>
        <div className={CartPageStyles.cartContent}>
          <div className={CartPageStyles.cartItems}>
            <div className={CartPageStyles.selectAllWr}>
              <label htmlFor="checkAll">
                <input
                  type="checkbox"
                  name=""
                  id="checkAll"
                  onChange={checkAllHandler}
                  checked={allChecked}
                />
                {' '}
                {allChecked ? 'Снять выделение' : 'Выбрать все'}
              </label>
              <button
                type="button"
                className={CartPageStyles.btn}
                onClick={deleteCheckedFromCartHandler}
              >
                Удалить выбранные
              </button>
            </div>
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
          <div className={CartPageStyles.cartTotals}>
            <h3>Условия заказа</h3>
            <div>
              <div>
                <span className={CartPageStyles.bold}>Итого: </span>
                {totalItems}
                {' '}
                товаров
              </div>
              <div>
                <span className={CartPageStyles.bold}>Сумма</span>
              </div>
              <div>Скидка</div>
            </div>
            <button
              type="button"
              className="btn btn-action"
            >
              <Link
                to="/"
                className={CartPageStyles.link}
              >
                Оформить
              </Link>
            </button>
          </div>
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
  const ids = Object.keys(cart)

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
      token={token}
      cart={cart}
      ids={ids}
    />
  )
}

export default CartPage
