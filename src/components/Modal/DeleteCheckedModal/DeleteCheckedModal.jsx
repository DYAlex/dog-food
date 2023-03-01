import { useDispatch } from 'react-redux'
import { deleteCheckedFromCart, deleteItemFromCart } from '../../../redux/slices/cartSlice'
import { DangerButton } from '../../CommonUI/Buttons/DangerButton'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
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
        <RegularButton btnName="Закрыть" clickHandler={closeDeleteCheckedModalHandler} />
        <DangerButton btnName="Удалить" clickHandler={deleteHandler} />
      </div>
    </Modal>
  )
}
