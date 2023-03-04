import { DangerButton } from '../../CommonUI/Buttons/DangerButton'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { Modal } from '../Modal'

export function DeleteProductModal({
  isOpen, closeHandler, title, deleteProductHandler,
}) {
  const closeDeleteProductModalHandler = () => {
    closeHandler(false)
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeDeleteProductModalHandler}>
      <div>
        Вы точно хотите удалить?
        {' '}
        <p>
          <b>
            &quot;
            {title}
            &quot;
          </b>
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <RegularButton btnName="Закрыть" clickHandler={closeDeleteProductModalHandler} />
        <DangerButton btnName="Удалить" clickHandler={deleteProductHandler} />
      </div>
    </Modal>
  )
}
