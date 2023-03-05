import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getUserSelector } from '../../../redux/slices/userSlice'
import { withQuery } from '../../../HOCs/withQuery'
import CartItem from './CartItem/CartItem'
import CartPageStyles from './Cart.module.css'
import {
  checkAll,
  uncheckAll,
  getCartSelector,
  deleteCheckedFromCart,
  deleteItemFromCart,
} from '../../../redux/slices/cartSlice'
import {
  getAllCheckedItems,
  getDiscountTotal,
  getIsAllChecked,
  getPriceFullTotal,
  getProductTitles,
  getTotalItems,
} from './utils/functions'
import { DeleteCheckedModal } from '../../Modal/DeleteCheckedModal/DeleteCheckedModal'
import { ActionButton } from '../../CommonUI/Buttons/ActionButton'
import { ErrorItem } from '../../CommonUI/ErrorItem/ErrorItem'

function CartPageInner({
  cart, products, notFoundIds = null,
}) {
  // eslint-disable-next-line max-len
  // console.log('cart, products', JSON.parse(JSON.stringify(cart)), JSON.parse(JSON.stringify(products)))
  // console.log('products.length, cart.length', products.length, Object.keys(cart).length)
  const dispatch = useDispatch()
  const [isDeleteCheckedModalOpen, setIsDeleteCheckedModalOpen] = useState(false)

  const totalItems = getTotalItems(cart)
  const isAllChecked = getIsAllChecked(cart)
  const priceFullTotal = getPriceFullTotal(cart, products)
  const discountTotal = getDiscountTotal(cart, products)

  const checkAllHandler = () => {
    if (!isAllChecked) {
      dispatch(checkAll())
    } else {
      dispatch(uncheckAll())
    }
  }

  const openDeleteCheckedModalHandler = () => {
    if (!isDeleteCheckedModalOpen) {
      setIsDeleteCheckedModalOpen(true)
    }
  }
  const closeDeleteCheckedModalHandler = () => {
    if (isDeleteCheckedModalOpen) {
      setIsDeleteCheckedModalOpen(false)
    }
  }

  const checkedItems = getAllCheckedItems(cart)

  const deleteCheckedHandler = () => {
    if (Array.isArray(checkedItems)) {
      dispatch(deleteCheckedFromCart(checkedItems))
      closeDeleteCheckedModalHandler()
    }
    dispatch(deleteItemFromCart(checkedItems))
    closeDeleteCheckedModalHandler()
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
                checked={isAllChecked}
              />
              {' '}
              {isAllChecked ? 'Снять выделение' : 'Выбрать все'}
            </label>
            <button
              type="button"
              className={CartPageStyles.btn}
              onClick={openDeleteCheckedModalHandler}
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
            {notFoundIds?.length
              ? notFoundIds.map((id) => (
                <ErrorItem
                  key={id}
                  id={id}
                  // eslint-disable-next-line react/jsx-boolean-value
                  isCartItem={true}
                />
              ))
              : null}
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
              {String(priceFullTotal).replace('.', ',')}
              {' '}
              рублей
            </div>
            <div>
              <span className={CartPageStyles.bold}>Скидка: </span>
              {String(discountTotal).replace('.', ',')}
              {' '}
              рублей
            </div>
            <div>
              <span className={CartPageStyles.bold}>Сумма заказа со скидками: </span>
              {String(priceFullTotal - discountTotal).replace('.', ',')}
              {' '}
              рублей
            </div>
          </div>
          <Link
            to="/"
            className={CartPageStyles.link}
          >
            <ActionButton
              btnName="Оформить"
              disabled={totalItems < 1}
            />
          </Link>
        </div>
      </div>
      <DeleteCheckedModal
        isOpen={isDeleteCheckedModalOpen}
        closeHandler={closeDeleteCheckedModalHandler}
        titles={getProductTitles(checkedItems, products)}
        deleteCheckedHandler={deleteCheckedHandler}
      />
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
      // console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  }, [token])

  const {
    data: products,
    isError,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['cart', ids, token],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
    enabled: !!token,
    keepPreviousData: true,
  })

  // eslint-disable-next-line max-len, no-underscore-dangle
  const productsFiltered = products && products.filter((productFromServer) => ids.includes(productFromServer._id))

  if (!ids?.length) {
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

  if (isSuccess && ids.length > productsFiltered.length) {
    // eslint-disable-next-line max-len, no-underscore-dangle
    const notFoundIds = ids.filter((cartId) => !productsFiltered.find((product) => cartId === product._id))
    const cartFiltered = {}
    ids.map((id) => {
      if (!notFoundIds.includes(id)) {
        return Object.assign(cartFiltered, { [id]: cart[id] })
      }
      return null
    })

    return (
      <CartPageInnerWithQuery
        products={productsFiltered}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        cart={cartFiltered}
        notFoundIds={notFoundIds}
      />
    )
  }

  if (isSuccess && ids.length === productsFiltered.length) {
    return (
      <CartPageInnerWithQuery
        products={productsFiltered}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        cart={cart}
      />
    )
  }
}

export default CartPage
