import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { useDispatch, useSelector } from 'react-redux'
import CartItemStyles from './CartItem.module.css'
import { addCartItem, getCartSelector, removeItemFromCart } from '../../../redux/slices/cartSlice'

function CartItem({ id, product }) {
  const cart = useSelector(getCartSelector)
  // console.log({ cart, id })
  // console.log(cart[id].count)
  const dispatch = useDispatch()
  if (product) {
    const addToCartHandler = () => {
      console.log('Product sent to cart', id)
      const { stock } = product
      console.log('Product stock', stock)
      dispatch(addCartItem({ id, stock }))
    }

    const removeFromCartHandler = () => {
      console.log('Product removed from cart', id)
      dispatch(removeItemFromCart(id))
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
              className={CartItemStyles.btn}
              onClick={removeFromCartHandler}
              disabled={cart[id].count === 1}
            >
              -
            </button>
            <p>{cart[id].count}</p>
            <button
              type="button"
              className={CartItemStyles.btn}
              onClick={addToCartHandler}
              disabled={cart[id].count === product.stock}
            >
              +
            </button>
          </div>
          <div className={CartItemStyles.btnWr}>
            <button
              type="button"
              className="btn"
              onClick={productDetailHandler}
            >
              <Link
                to={`/products/${id}`}
                className={CartItemStyles.Link}
              >
                Подробнее&nbsp;&gt;&gt;
              </Link>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
