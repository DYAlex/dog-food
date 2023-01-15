import { Link, Outlet } from 'react-router-dom'
import MainStyles from './Main.module.css'

function Main() {
  return (
    <div className={MainStyles.Main}>
      <h1>Добро пожаловать в наш магазин</h1>
      <Link to="./products">Наши товары</Link>
      <Outlet />
    </div>
  )
}

export default Main
