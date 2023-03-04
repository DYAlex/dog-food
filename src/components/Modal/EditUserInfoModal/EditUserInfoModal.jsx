import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { SubmitButton } from '../../CommonUI/Buttons/SubmitButton'
import { editUserInfoFormValidationSchema } from '../../utils/validator'
import { Modal } from '../Modal'
import EditUserInfoStyles from './EditUserInfo.module.css'

export function EditUserInfoModal({
  isOpen, closeModalHandler, editUserInfoHadler, user,
}) {
  const initialValues = {
    name: user.name,
    about: user.about,
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeModalHandler}>
      <div>
        <h2>Редактировать профиль</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={editUserInfoFormValidationSchema}
          onSubmit={editUserInfoHadler}
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

            <div className="d-flex justify-content-center">
              <RegularButton btnName="Закрыть" clickHandler={closeModalHandler} />
              <SubmitButton btnName="Редактировать" />
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
