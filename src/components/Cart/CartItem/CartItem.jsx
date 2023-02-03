import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import CartItemStyles from './CartItem.module.css'

function CartItem({ id, product }) {
  if (product) {
    const addToCartHandler = () => {
      console.log('Product added to cart')
    }

    const productDetailHandler = () => {
      console.log('Card clicked', id)
    }

    const addToFavsHandler = () => {
      console.log('Product added to favorites', id)
    }

    return (
      <div className={CartItemStyles.card}>
        <FontAwesomeIcon
          icon={faHeart}
          className={CartItemStyles.icon}
          onClick={addToFavsHandler}
        />
        <div className={CartItemStyles.imageWr}>
          <img
            src={product.pictures}
            alt="Фото товара"
          />
        </div>
        <div className={CartItemStyles.cardContent}>
          <p className={CartItemStyles.price}>
            {product.price}
            &nbsp;&#8381;
          </p>
          <p className={CartItemStyles.weight}>{product.wight}</p>
          <p className={CartItemStyles.name}>{product.name}</p>
          <div className={CartItemStyles.btnWr}>
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
              <Link to={id} className={CartItemStyles.Link}>Подробнее</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
