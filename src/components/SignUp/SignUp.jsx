import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { signUpFormValidationSchema } from '../validator'
import SignUpStyles from './SignUp.module.css'

const initialValues = {
  email: '',
  group: 'sm9',
  password: '',
}

function SignUp() {
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при создании учетной записи. 
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
    console.log(response)

    navigate('/signin')
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
          <div className={SignUpStyles.Form_Group}>
            <p className={SignUpStyles.Form_Label}>Электронная почта</p>
            <Field
              id="email"
              name="email"
              placeholder="Электронная почта"
              type="email"
              className={SignUpStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="email"
            />
          </div>

          <div className={SignUpStyles.Form_Group}>
            <p className={SignUpStyles.Form_Label}>Группа</p>
            <Field
              name="group"
              type="text"
              placeholder="sm9"
              className={SignUpStyles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="group"
            />
          </div>

          <div className={SignUpStyles.Form_Group}>
            <p className={SignUpStyles.Form_Label}>Пароль</p>
            <Field
              name="password"
              placeholder="Пароль"
              type="password"
              className={SignUpStyles.Form_Field}
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
            Зарегистрироваться
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignUp
