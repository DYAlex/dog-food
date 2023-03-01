import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useSelector } from 'react-redux'
import { dogFoodApi } from '../../../../api/DogFoodApi'
import { getUserSelector } from '../../../../redux/slices/userSlice'
import { withQuery } from '../../../../HOCs/withQuery'
import { addReviewFormValidationSchema } from '../../../utils/validator'
import AddReviewStyles from './AddReview.module.css'
import { SubmitButton } from '../../../CommonUI/Buttons/SubmitButton'

const initialValues = {
  rating: 0,
  text: '',
}

function AddReviewInner({ mutateAsync, isLoading }) {
  const queryClient = useQueryClient()

  const submitHandler = async (values) => {
    await mutateAsync(values)
    queryClient.invalidateQueries(['productId'])
  }

  return (
    <div className={AddReviewStyles.AddReview}>
      <h2>Добавить отзыв</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={addReviewFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={AddReviewStyles.Form}>
          <div className={AddReviewStyles.Form_Group}>
            <p className={AddReviewStyles.Form_Label}>Рейтинг</p>
            <Field
              name="rating"
              type="number"
              placeholder="5"
              className={AddReviewStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="rating"
            />
          </div>
          <div className={AddReviewStyles.Form_Group}>
            <p className={AddReviewStyles.Form_Label}>Текст</p>
            <Field
              name="text"
              // type="text"
              as="textarea"
              // rows="10"
              // cols="80"
              placeholder="Текст вашего отзыва..."
              className={AddReviewStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="text"
            />
          </div>
          <SubmitButton btnName="Отправить отзыв" disabled={isLoading} />
        </Form>
      </Formik>
    </div>
  )
}

const AddReviewInnerWithQuery = withQuery(AddReviewInner)
export function AddReview({ productId }) {
  const { token } = useSelector(getUserSelector)
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    refetch,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.addReviewToProductById(productId, token, values).then(),
  })

  return (
    <AddReviewInnerWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
      refetch={refetch}
    />
  )
}
