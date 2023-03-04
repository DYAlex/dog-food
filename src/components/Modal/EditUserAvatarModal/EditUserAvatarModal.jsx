import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { SubmitButton } from '../../CommonUI/Buttons/SubmitButton'
import { editUserAvatarFormValidationSchema } from '../../utils/validator'
import { Modal } from '../Modal'
import EditUserAvatarStyles from './EditUserAvatar.module.css'

export function EditUserAvatarModal({
  isOpen, closeModalHandler, user, editUserAvatarHadler,
}) {
  const closeEditUserInfoModalHandler = () => {
    closeModalHandler(false)
  }

  const initialValues = {
    avatar: user.avatar,
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeEditUserInfoModalHandler}>
      <div>
        <h2>Изменить аватар</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={editUserAvatarFormValidationSchema}
          onSubmit={editUserAvatarHadler}
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
              <SubmitButton btnName="Изменить" />
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
