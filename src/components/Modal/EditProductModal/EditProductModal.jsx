import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { SubmitButton } from '../../CommonUI/Buttons/SubmitButton'
import { addProductFormValidationSchema } from '../../utils/validator'
import { Modal } from '../Modal'
import EditProductStyles from './EditProduct.module.css'

export function EditProductModal({
  isOpen, closeHandler, product, editProductHandler,
}) {
  const closeEditProductModalHandler = () => {
    closeHandler()
  }

  const initialValues = {
    name: product.name, // string
    price: product.price, // number
    description: product.description, // string
    pictures: product.pictures, // string
    wight: product.wight, // string
    discount: product.discount, // number
    stock: product.stock, // number
    available: product.available,
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeEditProductModalHandler}>
      <div>
        <h2>Редактировать товар</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={addProductFormValidationSchema}
          onSubmit={editProductHandler}
        >
          <Form className={EditProductStyles.Form}>
            <div className={EditProductStyles.Form_Group}>
              <p className={EditProductStyles.Form_Label}>Название</p>
              <Field
                name="name"
                type="text"
                placeholder="Название вашего продукта"
                className={EditProductStyles.Form_Field}
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
              <RegularButton btnName="Закрыть" clickHandler={closeEditProductModalHandler} />
              <SubmitButton btnName="Редактировать" />
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
