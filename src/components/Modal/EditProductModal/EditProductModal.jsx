import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { addProductFormValidationSchema } from '../../utils/validator'
import { Modal } from '../Modal'
import EditProductStyles from './EditProduct.module.css'

let initialValues = {
  name: '', // string, обязательное
  price: 0, // number, обязательное
  description: '', // string, обязательное
  pictures: '', // string
  wight: '', // string
  discount: 0, // number
  stock: 0, // number
  available: true,
}

export function EditProductModal({
  isOpen, setIsOpen, product, id, token,
}) {
  const queryClient = useQueryClient()

  const closeEditProductModalHandler = () => {
    setIsOpen(false)
  }

  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    isSuccess,
    // refetch,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.editProductById(id, token, values).then(),
  })

  if (isError) console.log('Произошла ошибка при редактировании товара', error)
  if (isSuccess) {
    queryClient.invalidateQueries(['productId'])
    closeEditProductModalHandler()
  }

  initialValues = {
    name: product.name, // string
    price: product.price, // number
    description: product.description, // string
    pictures: product.pictures, // string
    wight: product.wight, // string
    discount: product.discount, // number
    stock: product.stock, // number
    available: product.available,
  }

  const submitHandler = async (values) => {
    await mutateAsync(values)
    queryClient.invalidateQueries(['productId'])
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeEditProductModalHandler}>
      <div>
        <h2>Редактировать товар</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={addProductFormValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className={EditProductStyles.Form}>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Название</p>
              <Field
                name="name"
                type="text"
                placeholder="Название вашего продукта"
                className={EditProductStyles.Form_Field}
                // value={product.name}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="name"
              />
            </div>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Цена</p>
              <Field
                name="price"
                type="number"
                className={EditProductStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="price"
              />
            </div>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Описание</p>
              <Field
                name="description"
                type="text"
                placeholder="Описание вашего продукта"
                className={EditProductStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="description"
              />
            </div>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Фото вашего продукта</p>
              <Field
                name="pictures"
                type="text"
                placeholder="Фото вашего продукта"
                className={EditProductStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="pictures"
              />
            </div>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Вес вашего продукта</p>
              <Field
                name="wight"
                type="text"
                placeholder="Вес вашего продукта"
                className={EditProductStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="wight"
              />
            </div>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Скидка</p>
              <Field
                name="discount"
                type="number"
                className={EditProductStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="discount"
              />
            </div>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>В наличии</p>
              <Field
                name="stock"
                type="number"
                className={EditProductStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="stock"
              />
            </div>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Доступен</p>
              <Field
                name="available"
                type="checkbox"
                className={EditProductStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="available"
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                onClick={closeEditProductModalHandler}
                type="button"
                className="btn"
              >
                Закрыть
              </button>
              <button
                className="btn btn-action"
                disabled={isLoading}
                type="submit"
              >
                Редактировать
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
