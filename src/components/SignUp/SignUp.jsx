import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { signUpFormValidationSchema } from '../validator'
import SignUpStyles from './SignUp.module.css'

const initialValues = {
  email: '',
  group: 'sm9',
  password: '',
}

function SignUp() {
  const submitHandler = (values) => {
    console.log({ values })
  }

  return (
    <div className={SignUpStyles.SignUp}>
      <h2>Создание учетной записи</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={SignUpStyles.Form}>
          <Field name="email" placeholder="Электронная почта" type="email" />
          <ErrorMessage component="p" className="error" name="email" />

          <Field name="group" type="text" placeholder="sm9" />
          <ErrorMessage component="p" className="error" name="group" />

          <Field name="password" placeholder="Пароль" type="password" />
          <ErrorMessage component="p" className="error" name="password" />

          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignUp
