import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { SubmitButton } from '../../CommonUI/Buttons/SubmitButton'
import { editUserInfoFormValidationSchema } from '../../utils/validator'
import { Modal } from '../Modal'
import EditUserInfoStyles from './EditUserInfo.module.css'

let initialValues = {
  name: '',
  about: '',
}

export function EditUserInfoModal({
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
    mutationFn: (values) => dogFoodApi.editUserInfo(values, token).then(),
  })

  if (isError) console.log('Произошла ошибка при редактировании информации о пользователе', error)
  if (isSuccess) {
    queryClient.invalidateQueries(['currentUser'])
    closeEditUserInfoModalHandler()
  }

  initialValues = {
    name: user.name,
    about: user.about,
  }

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeEditUserInfoModalHandler}>
      <div>
        <h2>Редактировать профиль</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={editUserInfoFormValidationSchema}
          onSubmit={submitHandler}
        >
          <Form className={EditUserInfoStyles.Form}>
            <div className={EditUserInfoStyles.Form_Group}>
              <p className={EditUserInfoStyles.Form_Label}>Имя</p>
              <Field
                name="name"
                type="text"
                placeholder="Имя"
                className={EditUserInfoStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="name"
              />
            </div>
            <div className={EditUserInfoStyles.Form_Group}>
              <p className={EditUserInfoStyles.Form_Label}>Информация</p>
              <Field
                name="about"
                type="text"
                className={EditUserInfoStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="about"
              />
            </div>
            {/* <div className={EditUserInfoStyles.Form_Group}>
              <p className={EditUserInfoStyles.Form_Label}>Аватар</p>
              <Field
                name="avatar"
                type="text"
                placeholder="avatar"
                className={EditUserInfoStyles.Form_Field}
              />
              <ErrorMessage
                component="p"
                className="error"
                name="avatar"
              />
            </div> */}

            <div className="d-flex justify-content-center">
              <RegularButton btnName="Закрыть" clickHandler={closeEditUserInfoModalHandler} />
              <SubmitButton btnName="Редактировать" disabled={isLoading} />
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
