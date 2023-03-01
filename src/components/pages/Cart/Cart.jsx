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

function CartPageInner({
  cart, products,
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
    setIsDeleteCheckedModalOpen(true)
  }

  const checkedItems = getAllCheckedItems(cart)

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
      <DeleteCheckedModal
        isOpen={isDeleteCheckedModalOpen}
        setIsDeleteCheckedModalOpen={setIsDeleteCheckedModalOpen}
        titles={getProductTitles(checkedItems, products)}
        ids={checkedItems}
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
    refetch,
  } = useQuery({
    queryKey: ['cart', ids, token],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
    enabled: !!token,
    keepPreviousData: true,
  })

  // eslint-disable-next-line max-len, no-underscore-dangle
  const productsFiltered = products && products.filter((productFromServer) => ids.includes(productFromServer._id))

  if (!products?.length) {
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

  if (ids.length === productsFiltered.length) {
    return (
      <CartPageInnerWithQuery
        products={products}
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
