import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { useQueryContext } from '../../contexts/QueryContextProvider'
import { signInFormValidationSchema } from '../validator'
import SignInStyles from './SignIn.module.css'

const initialValues = {
  email: '',
  password: '',
}

function SignIn() {
  const navigate = useNavigate()
  const { setToken } = useQueryContext()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogFoodApi.signIn(values).then((result) => {
      setToken(result.token)
    }),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    navigate(-1 ?? '/')
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
            disabled={isLoading}
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
