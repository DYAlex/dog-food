import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { Modal } from '../Modal'

export function DeleteProductModal({
  isOpen, setIsOpen, title, id, token,
}) {
  const navigate = useNavigate()
  // const queryClient = useQueryClient()
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)

  const closeDeleteProductModalHandler = () => {
    setIsOpen(false)
  }

  const {
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['deleteProduct', id],
    queryFn: () => dogFoodApi.deleteProductById(id, token),
    enabled: deleteConfirmed,
  })
  if (isError) console.log('Произошла ошибка при удалении товара', error)
  if (isSuccess) {
    // closeDeleteProductModalHandler()
    // queryClient.invalidateQueries()
    navigate('/products')
  }

  const deleteHandler = () => {
    console.log('Deleting product', { id, title })
    setDeleteConfirmed(true)
    // closeDeleteProductModalHandler()
    // queryClient.invalidateQueries()
    // navigate('/products')
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
        <button
          onClick={closeDeleteProductModalHandler}
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
