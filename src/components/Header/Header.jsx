import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from '../../images/logo-husky-black.svg'
import logoWithLetters from '../../images/logo-with-letters-black.svg'
import headerStyles from './Header.module.css'
import { getUserSelector } from '../../redux/slices/userSlice'
import CartBtn from '../Cart/CartBtn/CartBtn'

const vw = window.innerWidth
function Header() {
  // console.log(vw)
  const { token } = useSelector(getUserSelector)
  // console.log('from header using store', { token })
  let btns = (
    <>
      <button
        type="button"
        className={headerStyles.Button}
      >
        <Link
          to="./signin"
          className={headerStyles.Link}
        >
          Войти
        </Link>
      </button>
      <button
        type="button"
        className={headerStyles.Button}
      >
        <Link
          to="./signup"
          className={headerStyles.Link}
        >
          Зарегистрироваться
        </Link>
      </button>
    </>
  )
  if (token) {
    btns = (
      <>
        <NavLink
          to="/favorites"
          className={classNames(headerStyles.Link)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
        <NavLink
          to="/cart"
          className={classNames(headerStyles.Link)}
        >
          <CartBtn />
        </NavLink>
        <NavLink
          to="/profile"
          className={classNames(headerStyles.Link)}
        >
          <FontAwesomeIcon icon={faPaw} />
        </NavLink>
      </>
    )
  }
  return (
    <div className={headerStyles.Header}>
      <div className={headerStyles.wr}>
        <div className={headerStyles.Logo}>
          <Link
            to="/"
            className={headerStyles.Link}
          >
            <img
              src={vw > 768 ? logoWithLetters : logo}
              alt=""
            />
          </Link>
        </div>
        <div className={headerStyles.Buttons}>{btns}</div>
      </div>
    </div>
  )
}

export default Header
