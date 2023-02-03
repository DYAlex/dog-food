import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../../redux/slices/cartSlice'
import ProductCardStyles from './ProductCard.module.css'

function ProductCard({ id, product }) {
  const dispatch = useDispatch()
  // if (product) {
  const addToCartHandler = () => {
    console.log('Product sent to cart', id)

    dispatch(addCartItem(id))
    // console.log('After dispatch', id)
  }

  const productDetailHandler = () => {
    console.log('Card clicked', id)
  }

  const addToFavsHandler = () => {
    console.log('Product added to favorites', id)
  }

  return (
    <div className={ProductCardStyles.card}>
      <FontAwesomeIcon
        icon={faHeart}
        className={ProductCardStyles.icon}
        onClick={addToFavsHandler}
      />
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
          <button
            type="button"
            className="btn btn-action"
            onClick={addToCartHandler}
          >
            В корзину
          </button>
          <button
            type="button"
            className="btn"
            onClick={productDetailHandler}
          >
            <Link to={id} className={ProductCardStyles.Link}>Подробнее</Link>
          </button>
        </div>
      </div>
    </div>
  )
  // }
}

export default ProductCard
