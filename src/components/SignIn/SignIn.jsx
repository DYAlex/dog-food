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
          <Field name="email" placeholder="Электронная почта" type="email" />
          <ErrorMessage component="p" className="error" name="email" />

          <Field name="password" placeholder="Пароль" type="password" />
          <ErrorMessage component="p" className="error" name="password" />

          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignIn
