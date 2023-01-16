import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { signInFormValidationSchema } from '../validator'
import SignInStyles from './SignIn.module.css'

const initialValues = {
  email: '',
  password: '',
}

function SignIn() {
  const submitHandler = (values) => {
    console.log({ values })
  }

  return (
    <div className={SignInStyles.SignIn}>
      <h2>Войти в личный кабинет</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signInFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={SignInStyles.Form}>
          <div className={SignInStyles.Form_Group}>
            <p className={SignInStyles.Form_Label}>Электронная почта</p>
            <Field
              name="email"
              placeholder="Электронная почта"
              type="email"
              className={SignInStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="email"
            />
          </div>

          <div className={SignInStyles.Form_Group}>
            <p className={SignInStyles.Form_Label}>Пароль</p>
            <Field
              name="password"
              placeholder="Пароль"
              type="password"
              className={SignInStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-action"
          >
            Войти
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignIn
