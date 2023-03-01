import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import FavoritesItemStyles from './FavoritesItem.module.css'
import {
  addToFavorites,
  getFavoritesSelector,
  removeFromFavorites,
} from '../../../../redux/slices/favoritesSlice'
import { addCartItem, getCartSelector } from '../../../../redux/slices/cartSlice'
import { QuantityController } from '../../../CommonUI/QuantityController/QuantityController'
import { ActionButton } from '../../../CommonUI/Buttons/ActionButton'
import { RegularButton } from '../../../CommonUI/Buttons/RegularButton'
import { DangerButton } from '../../../CommonUI/Buttons/DangerButton'

function FavoritesItem({ id, product }) {
  const cart = useSelector(getCartSelector)
  const favorites = useSelector(getFavoritesSelector)
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(favorites[id]?.isFavorite)

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

  const addToCartHandler = () => {
    // console.log('Product sent to cart', id)
    const { stock } = product
    // console.log('Product stock', stock)
    dispatch(addCartItem({ id, stock }))
  }

  const getPrice = () => {
    if (product.discount > 1) {
      return (
        <>
          <span className={FavoritesItemStyles.priceFull}>
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

  return (
    <div className={FavoritesItemStyles.card}>
      <div className={FavoritesItemStyles.imageWr}>
        <img
          src={product.pictures}
          alt="Фото товара"
        />
      </div>
      <div className={FavoritesItemStyles.cardContent}>
        <p
          className={FavoritesItemStyles.name}
        >
          <Link
            to={`/products/${id}`}
            className={FavoritesItemStyles.Link}
          >
            {product.name}
          </Link>
        </p>
        <p className={FavoritesItemStyles.price}>
          {getPrice()}
        </p>
        <p className={FavoritesItemStyles.weight}>{product.wight}</p>
      </div>
      <div className={FavoritesItemStyles.btnWr}>
        {cart[id]
          ? (<QuantityController id={id} stock={product.stock} />)
          : (
            <ActionButton
              btnName="В корзину"
              clickHandler={addToCartHandler}
            />
          )}
        <div className={FavoritesItemStyles.available}>
          В наличии
          {' '}
          {product.stock}
          {' '}
          штук
        </div>
        <Link to={id} className={FavoritesItemStyles.Link}>
          <RegularButton
            btnName="Подробнее"
          />
        </Link>
        <DangerButton
          btnName={isFavorite ? 'Убрать из избранного' : 'В избранное'}
          clickHandler={addToFavsHandler}
        />
      </div>
    </div>
  )
}

export default FavoritesItem
