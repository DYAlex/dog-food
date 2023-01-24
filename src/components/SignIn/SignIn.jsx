import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryContext } from '../../contexts/QueryContextProvider'
import { signInFormValidationSchema } from '../validator'
import SignInStyles from './SignIn.module.css'

const initialValues = {
  email: '',
  password: '',
}

function SignIn() {
  const navigate = useNavigate()
  const { token, setToken } = useContext(QueryContext)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при входе в Личный кабинет. 
        Проверьте отправляемые данные. Status: ${res.status}`)
      }

      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении ответа от сервера. 
        Попробуйте сделать запрос позже. Status: ${res.status}`)
      }

      return res.json()
    }),
  })

  const submitHandler = async (values) => {
    const response = await mutateAsync(values)
    setToken(response.token)
    setTimeout(console.log({ token }), 10)
    navigate('/')
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
