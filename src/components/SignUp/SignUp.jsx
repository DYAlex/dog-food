import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { withQuery } from '../HOCs/withQuery'
import { signUpFormValidationSchema } from '../validator'
import SignUpStyles from './SignUp.module.css'

const initialValues = {
  email: '',
  group: 'sm9',
  password: '',
}

function SignUpInner({ mutateAsync, isLoading }) {
  const navigate = useNavigate()
  const submitHandler = async (values) => {
    await mutateAsync(values)
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

const SignUpInnerWithQuery = withQuery(SignUpInner)
export function SignUp() {
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    refetch,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signUp(values).then(),
  })

  return (
    <SignUpInnerWithQuery
      mutateAsync={mutateAsync}
      isError={isError}
      error={error}
      isLoading={isLoading}
      refetch={refetch}
    />
  )
}
