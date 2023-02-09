import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, getCartSelector, removeItemFromCart } from '../../../redux/slices/cartSlice'
import QuantityControllerStyles from './QuantityController.module.css'

export function QuantityController({ id, stock }) {
  const dispatch = useDispatch()
  const cart = useSelector(getCartSelector)
  const addToCartHandler = () => {
    // console.log('Product added to cart', id)
    dispatch(addCartItem({ id, stock }))
  }

  const removeFromCartHandler = () => {
    // console.log('Product removed from cart', id)
    dispatch(removeItemFromCart(id))
  }
  return (
    <div className={QuantityControllerStyles.container}>
      <div className={QuantityControllerStyles.btnWr}>
        <button
          type="button"
          className={QuantityControllerStyles.btn}
          onClick={removeFromCartHandler}
          disabled={cart[id]?.count === 1}
        >
          -
        </button>
        <p className={QuantityControllerStyles.count}>{cart[id]?.count}</p>
        <button
          type="button"
          className={QuantityControllerStyles.btn}
          onClick={addToCartHandler}
          disabled={cart[id]?.count === stock}
        >
          +
        </button>
      </div>
    </div>
  )
}
