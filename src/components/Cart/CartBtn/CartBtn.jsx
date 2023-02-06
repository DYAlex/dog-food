import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getCartSelector } from '../../../redux/slices/cartSlice'
import CartBtnStyles from './CartBtn.module.css'

function CartBtn() {
  const cart = useSelector(getCartSelector)
  // console.log(cart)
  const cartLength = Object.keys(cart).length
  console.log({ cartLength })
  return (
    <div className={CartBtnStyles.container}>
      <FontAwesomeIcon icon={faCartShopping} />
      {cartLength
        ? (
          <div className={CartBtnStyles.wr}>
            <span className={CartBtnStyles.counter}>{cartLength}</span>
          </div>
        )
        : (null)}
    </div>
  )
}

export default CartBtn
