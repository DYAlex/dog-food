import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import CartItemStyles from './CartItem.module.css'
import {
  changeIsChecked,
  getCartSelector,
} from '../../../redux/slices/cartSlice'
import { QuantityController } from '../../CommonUI/QuantityController/QuantityController'
import { DeleteCheckedModal } from '../../Modal/DeleteCheckedModal/DeleteCheckedModal'
import {
  addToFavorites,
  getFavoritesSelector,
  removeFromFavorites,
} from '../../../redux/slices/favoritesSlice'

function CartItem({ id, product }) {
  const cart = useSelector(getCartSelector)
  const favorites = useSelector(getFavoritesSelector)
  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(favorites[id]?.isFavorite)
  const productDetailHandler = () => {
    // console.log('More product info from cartItem.name', id)
  }

  const addToFavsHandler = () => {
    if (!isFavorite) {
      // console.log('Product added to favorites', id)
      setIsFavorite(() => !isFavorite)
      return dispatch(addToFavorites(id))
    }
    // console.log('Product removed from favorites', id)
    setIsFavorite(() => !isFavorite)
    return dispatch(removeFromFavorites(id))
  }

  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true)
  }

  const isCheckedHandler = () => {
    dispatch(changeIsChecked(id))
  }

  const getPrice = () => {
    if (product.discount > 1) {
      return (
        <>
          <span className={CartItemStyles.priceFull}>
            {String(product.price).replace('.', ',')}
            &nbsp;&#8381;
          </span>
          {' '}
          {String(product.price - ((product.price * product.discount) / 100)).replace('.', ',')}
          &nbsp;&#8381;
        </>
      )
    }
    return (
      <>
        {String(product.price).replace('.', ',')}
        &nbsp;&#8381;
      </>
    )
  }
  if (cart[id]) {
    return (
      <div className={CartItemStyles.card}>
        <div className={CartItemStyles.selectWr}>
          <input
            type="checkbox"
            name="select"
            id=""
            checked={cart[id].isChecked}
            onChange={isCheckedHandler}
          />
        </div>
        <div className={CartItemStyles.imageWr}>
          <img
            src={product.pictures}
            alt="Фото товара"
          />
        </div>
        <div className={CartItemStyles.cardContent}>
          <p
            className={CartItemStyles.name}
          >
            <Link
              to={`/products/${id}`}
              className={CartItemStyles.Link}
              onClick={productDetailHandler}
            >
              {product.name}
            </Link>
          </p>
          <p className={CartItemStyles.price}>
            {getPrice()}
          </p>
          <p className={CartItemStyles.weight}>{product.wight}</p>
          <div className={CartItemStyles.btnWr}>
            <button
              type="button"
              className="btn"
              onClick={addToFavsHandler}
            >
              {isFavorite ? 'Убрать из избранного' : 'В избранное'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={openDeleteModalHandler}
            >
              Удалить
            </button>
          </div>
        </div>
        <div className={CartItemStyles.quantityControllerWr}>
          <QuantityController
            id={id}
            stock={product.stock}
          />
          <div className={CartItemStyles.available}>
            В наличии
            {' '}
            {product.stock}
            {' '}
            штук
          </div>
        </div>
        <DeleteCheckedModal
          isOpen={isDeleteModalOpen}
          setIsDeleteCheckedModalOpen={setIsDeleteModalOpen}
          titles={product.name}
          ids={id}
        />
      </div>
    )
  }
}

export default CartItem
