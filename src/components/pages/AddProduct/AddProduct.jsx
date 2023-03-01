import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getUserSelector } from '../../../redux/slices/userSlice'
import { withQuery } from '../../../HOCs/withQuery'
import { addProductFormValidationSchema } from '../../utils/validator'
import AddProductStyles from './AddProduct.module.css'
import { SubmitButton } from '../../CommonUI/Buttons/SubmitButton'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'

const initialValues = {
  name: '', // string, обязательное
  price: 0, // number, обязательное
  description: '', // string, обязательное
  pictures: '', // string
  wight: '', // string
  discount: 0, // number
  stock: 0, // number
  available: true,
}

function AddProductInner({ mutateAsync, isLoading }) {
  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const goBackHandler = () => navigate(-1)
  const submitHandler = async (values) => {
    await mutateAsync(values)
    queryClient.invalidateQueries()
    goBackHandler()
  }

  return (
    <div className={AddProductStyles.AddProduct}>
      <h2>Добавить товар</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={addProductFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={AddProductStyles.Form}>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>Название</p>
            <Field
              name="name"
              type="text"
              placeholder="Название вашего продукта"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="name"
            />
          </div>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>Цена</p>
            <Field
              name="price"
              type="number"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="price"
            />
          </div>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>Описание</p>
            <Field
              name="description"
              type="text"
              placeholder="Описание вашего продукта"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="description"
            />
          </div>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>Фото вашего продукта</p>
            <Field
              name="pictures"
              type="text"
              placeholder="Фото вашего продукта"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="pictures"
            />
          </div>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>Вес вашего продукта</p>
            <Field
              name="wight"
              type="text"
              placeholder="Вес вашего продукта"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="wight"
            />
          </div>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>Скидка</p>
            <Field
              name="discount"
              type="number"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="discount"
            />
          </div>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>В наличии</p>
            <Field
              name="stock"
              type="number"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="stock"
            />
          </div>
          <div className={AddProductStyles.Form_Group}>
            <p className={AddProductStyles.Form_Label}>Доступен</p>
            <Field
              name="available"
              type="checkbox"
              className={AddProductStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="available"
            />
          </div>
          <div className={AddProductStyles.btnWr}>
            <SubmitButton
              btnName="Добавить товар"
              disabled={isLoading}
            />
            <RegularButton
              btnName="Отмена"
              clickHandler={goBackHandler}
            />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

const AddProductInnerWithQuery = withQuery(AddProductInner)
export function AddProduct() {
  const { token } = useSelector(getUserSelector)
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    refetch,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.addNewProduct(token, values).then(),
  })

  return (
    <AddProductInnerWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
      refetch={refetch}
    />
  )
}
