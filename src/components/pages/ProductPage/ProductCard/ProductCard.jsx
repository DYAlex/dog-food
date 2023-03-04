import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons/faHeart'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, getCartSelector } from '../../../../redux/slices/cartSlice'
import ProductCardStyles from './ProductCard.module.css'
import { QuantityController } from '../../../CommonUI/QuantityController/QuantityController'
import {
  addToFavorites,
  getFavoritesSelector,
  removeFromFavorites,
} from '../../../../redux/slices/favoritesSlice'
import { ActionButton } from '../../../CommonUI/Buttons/ActionButton'
import { RegularButton } from '../../../CommonUI/Buttons/RegularButton'

function ProductCard({ id, product }) {
  const dispatch = useDispatch()
  const cart = useSelector(getCartSelector)
  const favorites = useSelector(getFavoritesSelector)
  const [isFavorite, setIsFavorite] = useState(() => (favorites[id]?.isFavorite))
  const addToCartHandler = () => {
    // console.log('Product sent to cart', id)
    const { stock } = product
    // console.log('Product stock', stock)
    dispatch(addCartItem({ id, stock }))
  }

  const addToFavsHandler = () => {
    if (!isFavorite) {
      setIsFavorite(() => !isFavorite)
      return dispatch(addToFavorites(id))
    }
    setIsFavorite(() => !isFavorite)
    return dispatch(removeFromFavorites(id))
  }

  return (
    <div className={ProductCardStyles.card}>
      <FontAwesomeIcon
        icon={
          isFavorite
            ? faHeartSolid
            : faHeart
        }
        className={
          isFavorite
            ? classNames(ProductCardStyles.icon, ProductCardStyles.fav)
            : ProductCardStyles.icon
        }
        onClick={addToFavsHandler}
      />
      {product.discount
        ? (
          <div className={ProductCardStyles.discount}>
            -
            {product.discount}
            %
          </div>
        )
        : (null)}
      <div className={ProductCardStyles.imageWr}>
        <img
          src={product.pictures}
          alt="Фото товара"
        />
      </div>
      <div className={ProductCardStyles.cardContent}>
        <p className={ProductCardStyles.price}>
          {product.price}
          &nbsp;&#8381;
        </p>
        <p className={ProductCardStyles.weight}>{product.wight}</p>
        <p className={ProductCardStyles.name}>{product.name}</p>
        <div className={ProductCardStyles.btnWr}>
          {cart[id]
            ? (<QuantityController id={id} stock={product.stock} />)
            : (
              <ActionButton
                btnName="В корзину"
                clickHandler={addToCartHandler}
              />
            )}
          <Link to={id} className={ProductCardStyles.Link}>
            <RegularButton btnName="Подробнее" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
