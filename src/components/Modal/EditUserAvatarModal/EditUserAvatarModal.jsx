import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { SubmitButton } from '../../CommonUI/Buttons/SubmitButton'
import { editUserAvatarFormValidationSchema } from '../../utils/validator'
import { Modal } from '../Modal'
import EditUserAvatarStyles from './EditUserAvatar.module.css'

let initialValues = {
  avatar: '',
}

export function EditUserAvatarModal({
  isOpen, setIsOpen, user, token,
}) {
  const queryClient = useQueryClient()

  const closeEditUserInfoModalHandler = () => {
    setIsOpen(false)
  }

  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.editUserAvatar(values, token).then(),
  })

  if (isError) console.log('Произошла ошибка при редактировании информации о пользователе', error)
  if (isSuccess) {
    queryClient.invalidateQueries(['currentUser'])
    closeEditUserInfoModalHandler()
  }

  initialValues = {
    avatar: user.avatar,
  }

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeEditUserInfoModalHandler}>
      <div>
        <h2>Изменить аватар</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={editUserAvatarFormValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className={EditUserAvatarStyles.Form}>
            <div className={EditUserAvatarStyles.Form_Group}>
              <p className={EditUserAvatarStyles.Form_Label}>Аватар</p>
              <Field
                name="avatar"
                type="text"
                placeholder="avatar"
                className={EditUserAvatarStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="avatar"
              />
            </div>

            <div className="d-flex justify-content-center">
              <RegularButton btnName="Закрыть" clickHandler={closeEditUserInfoModalHandler} />
              <SubmitButton btnName="Изменить" disabled={isLoading} />
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
