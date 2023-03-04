import { DangerButton } from '../../CommonUI/Buttons/DangerButton'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { Modal } from '../Modal'

export function DeleteCheckedModal({
  isOpen, closeHandler, titles, deleteCheckedHandler,
}) {
  const isTitlesArray = Array.isArray(titles)
  const closeDeleteCheckedModalHandler = () => {
    closeHandler()
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
        <DangerButton btnName="Удалить" clickHandler={deleteCheckedHandler} />
      </div>
    </Modal>
  )
}
