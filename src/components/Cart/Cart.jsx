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
  cart, ids, products, isError,
}) {
  const dispatch = useDispatch()

  if (products.length > 0) {
    const totalItems = Object.keys(cart).reduce((acc, cartItem) => {
      if (cart[cartItem].isChecked) {
        const sum = acc + cart[cartItem].count
        return sum
      }
      return acc
    }, 0)
    const allChecked = Object.keys(cart).reduce((acc, cartItem) => {
      if (!cart[cartItem].isChecked) {
        return false
      }
      return acc
    }, true)

    const getAllCheckedItems = () => {
      const allCheckedItems = []
      Object.keys(cart).forEach((item) => {
        if (cart[item].isChecked) allCheckedItems.push(item)
      })
      return allCheckedItems
    }
    // eslint-disable-next-line no-underscore-dangle
    const getItemById = (itemId) => (products.find((item) => item._id === itemId))

    const priceFullTotal = () => (
      getAllCheckedItems().reduce((total, item) => {
        const product = getItemById(item)
        const sum = total + cart[item].count * product.price
        return sum
      }, 0)
    )
    const discountTotal = () => (
      getAllCheckedItems().reduce((total, item) => {
        const product = getItemById(item)
        const sum = total + cart[item].count * ((product.price * product.discount) / 100)
        return sum
      }, 0)
    )

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
      // console.log('deleteCheckedFromCartHandler clicked')
      dispatch(deleteCheckedFromCart(getAllCheckedItems()))
    }
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
            <h4>Условия заказа</h4>
            <div className={CartPageStyles.cartTotal}>
              <div>
                <span className={CartPageStyles.bold}>Итого: </span>
                {totalItems}
                {' '}
                товаров
              </div>
              <div>
                <span className={CartPageStyles.bold}>Сумма без скидки: </span>
                {String(priceFullTotal()).replace('.', ',')}
                {' '}
                рублей
              </div>
              <div>
                <span className={CartPageStyles.bold}>Скидка: </span>
                {String(discountTotal()).replace('.', ',')}
                {' '}
                рублей
              </div>
              <div>
                <span className={CartPageStyles.bold}>Сумма заказа со скидками: </span>
                {String(priceFullTotal() - discountTotal()).replace('.', ',')}
                {' '}
                рублей
              </div>
            </div>
            <Link
              to="/"
              className={CartPageStyles.link}
            >
              <button
                type="button"
                className="btn btn-action"
                disabled={totalItems < 1}
              >
                Оформить
              </button>
            </Link>
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
  const navigate = useNavigate()
  const cart = useSelector(getCartSelector)
  const ids = Object.keys(cart)

  useEffect(() => {
    if (!token) {
      console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  }, [token])

  const {
    data: products,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cart', token],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
  })

  return (
    <CartPageInnerWithQuery
      products={products}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      cart={cart}
      ids={ids}
    />
  )
}

export default CartPage
