import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import {
  setUserEmail, setUserGroup, setUserId, setUserName, setUserToken,
} from '../../../redux/slices/userSlice'
import { withQuery } from '../../../HOCs/withQuery'
import { signInFormValidationSchema } from '../../utils/validator'
import SignInStyles from './SignIn.module.css'

const initialValues = {
  email: '',
  password: '',
}

function SignInInner({ mutateAsync, isLoading }) {
  const navigate = useNavigate()
  const submitHandler = async (values) => {
    await mutateAsync(values)
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

const SignInInnerWithQuery = withQuery(SignInInner)

export function SignIn() {
  const dispatch = useDispatch()

  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    refetch,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signIn(values).then((result) => {
      dispatch(setUserToken(result.token))
      // eslint-disable-next-line no-underscore-dangle
      dispatch(setUserId(result.data._id))
      dispatch(setUserName(result.data.name))
      dispatch(setUserEmail(result.data.email))
      dispatch(setUserGroup(result.data.group))
    }),
  })

  return (
    <SignInInnerWithQuery
      mutateAsync={mutateAsync}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
}
