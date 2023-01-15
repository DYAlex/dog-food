import { Link } from 'react-router-dom'
import headerStyles from './Header.module.css'

function Header() {
  return (
    <div className={headerStyles.Header}>
      <p>Header</p>
      <Link to="./signup">Зарегистрироваться</Link>
    </div>
  )
}

export default Header
