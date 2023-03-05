import { useDispatch } from 'react-redux'
import { deleteItemFromCart } from '../../../redux/slices/cartSlice'
import { removeFromFavorites } from '../../../redux/slices/favoritesSlice'
import { ActionButton } from '../Buttons/ActionButton'
import errorItemPicture from '../../../images/errorItem.png'
import ErrorItemStyles from './ErrorItem.module.css'

export function ErrorItem({ id, isFavorite = false, isCartItem = false }) {
  const dispatch = useDispatch()

  const removeFromCartHandler = () => {
    dispatch(deleteItemFromCart(id))
  }
  const removeFromFavsHandler = () => {
    dispatch(removeFromFavorites(id))
  }
  return (
    <div className={ErrorItemStyles.card}>
      <div className={ErrorItemStyles.imageWr}>
        <img
          src={errorItemPicture}
          alt="Фото товара"
        />
      </div>
      <div className={ErrorItemStyles.cardContent}>
        <p
          className={ErrorItemStyles.name}
        >
          Товар не найден. Вероятно он был удален продавцом
        </p>
        <p className={ErrorItemStyles.id}>
          {id}
        </p>
      </div>
      <div className={ErrorItemStyles.btnWr}>
        {isCartItem
          && (
            <ActionButton
              btnName="Удалить из корзины"
              clickHandler={removeFromCartHandler}
            />
          )}
        {isFavorite
          ? (
            <ActionButton
              btnName="Убрать из избранного"
              clickHandler={removeFromFavsHandler}
            />
          )
          : null}
      </div>
    </div>
  )
}
