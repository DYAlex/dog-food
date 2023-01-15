import { Link } from 'react-router-dom'
import headerStyles from './Header.module.css'

function Header() {
  return (
    <div className={headerStyles.Header}>
      <p>Header</p>
      <div>
        <Link to="./signin" className={headerStyles.Link}>Войти</Link>
        <Link to="./signup" className={headerStyles.Link}>Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Header
