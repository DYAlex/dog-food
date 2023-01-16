import { Link } from 'react-router-dom'
// import logo from '../../images/logo-husky-black.svg'
import logoWithLetters from '../../images/logo-with-letters-black.svg'
import Search from '../Search/Search'
import headerStyles from './Header.module.css'

function Header() {
  return (
    <div className={headerStyles.Header}>
      <div className={headerStyles.Logo}>
        <Link to="/" className={headerStyles.Link}>
          <img src={logoWithLetters} alt="" />
        </Link>
      </div>
      <div className={headerStyles.Search}>
        <Search />
      </div>
      <div className={headerStyles.Buttons}>
        <button type="button" className={headerStyles.Button}>
          <Link to="./signin" className={headerStyles.Link}>Войти</Link>
        </button>
        <button type="button" className={headerStyles.Button}>
          <Link to="./signup" className={headerStyles.Link}>Зарегистрироваться</Link>
        </button>
      </div>
    </div>
  )
}

export default Header
