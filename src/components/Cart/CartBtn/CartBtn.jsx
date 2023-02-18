import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getCartSelector } from '../../../redux/slices/cartSlice'
import { Counter } from '../../CommonUI/Counter/Counter'
import CartBtnStyles from './CartBtn.module.css'

function CartBtn() {
  const cart = useSelector(getCartSelector)
  const cartLength = Object.keys(cart).length

  return (
    <div className={CartBtnStyles.container}>
      <FontAwesomeIcon icon={faCartShopping} />
      {cartLength
        ? (
          <Counter count={cartLength} />
        )
        : (null)}
    </div>
  )
}

export default CartBtn
