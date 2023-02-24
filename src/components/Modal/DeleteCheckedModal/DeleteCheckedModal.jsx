import { useDispatch } from 'react-redux'
import { deleteCheckedFromCart, deleteItemFromCart } from '../../../redux/slices/cartSlice'
import { Modal } from '../Modal'

export function DeleteCheckedModal({
  isOpen, setIsDeleteCheckedModalOpen, titles, ids,
}) {
  const dispatch = useDispatch()
  const isTitlesArray = Array.isArray(titles)
  const closeDeleteCheckedModalHandler = () => {
    setIsDeleteCheckedModalOpen(false)
  }
  const deleteHandler = () => {
    if (isTitlesArray) {
      return dispatch(deleteCheckedFromCart(ids))
    }
    return dispatch(deleteItemFromCart(ids))
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeDeleteCheckedModalHandler}>
      <div>
        Вы точно хотите удалить?
        {' '}
        {isTitlesArray ? titles.map((title) => (
          <p key={title}>
            <b>
              &quot;
              {title}
              &quot;
            </b>
          </p>
        )) : titles}
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={closeDeleteCheckedModalHandler}
          type="button"
          className="btn"
        >
          Закрыть
        </button>
        <button
          onClick={deleteHandler}
          type="button"
          className="btn btn-danger"
        >
          Удалить
        </button>
      </div>
    </Modal>
  )
}
