import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartItemStyles from './CartItem.module.css'
import {
  changeIsChecked,
  deleteItemFromCart,
  getCartSelector,
} from '../../../redux/slices/cartSlice'
import { QuantityController } from '../../commonUI/QuantityController/QuantityController'

function CartItem({ id, product }) {
  const cart = useSelector(getCartSelector)
  const dispatch = useDispatch()
  // console.log({ cart, id })
  // console.log(cart[id].isChecked, id)
  // const navigate = useNavigate()
  if (product) {
    const productDetailHandler = () => {
      console.log('More product info from cartItem.name', id)
    }

    const addToFavsHandler = () => {
      console.log('Product added to favorites', id)
    }

    const deleteProductHandler = () => {
      // console.log('Product deleted from cart', id)
      dispatch(deleteItemFromCart(id))
      // setTimeout(navigate('/cart'))
    }

    const isCheckedHandler = () => {
      // console.log('Product is checked in cart', id)
      dispatch(changeIsChecked(id))
    }

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
            {product.price}
            &nbsp;&#8381;
          </p>
          <p className={CartItemStyles.weight}>{product.wight}</p>
          <div className={CartItemStyles.btnWr}>
            <button
              type="button"
              className="btn"
              onClick={addToFavsHandler}
            >
              В избранное
            </button>
            <button
              type="button"
              className="btn"
              onClick={deleteProductHandler}
            >
              Удалить
            </button>
          </div>
        </div>
        <QuantityController
          id={id}
          stock={product.stock}
        />
      </div>
    )
  }
}

export default CartItem
