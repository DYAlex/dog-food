/* eslint-disable react/jsx-one-expression-per-line */
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { QueryContext } from '../../contexts/QueryContextProvider'
import { Loader } from '../Loader/Loader'
import ProfileStyles from './Profile.module.css'

function Profile() {
  const { token, setToken } = useContext(QueryContext)
  const navigate = useNavigate()

  if (!token) {
    // console.log('Redirecting to SignIn page')
    useEffect(() => navigate('/signin'))
  }
  const {
    // data, isLoading, isError, error, refetch,
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => fetch('https://api.react-learning.ru/v2/sm9/users/me', {
      headers: {
        authorization: `Bearer ${token}`,
      },
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
  // console.log(data)

  if (isLoading) {
    return <Loader />
  }

  const logoutHandler = () => {
    // console.log('Logging out')
    setToken('')
    navigate('/')
  }
  if (user) {
    return (
      <div className={ProfileStyles.Profile}>
        <h1>Личный кабинет</h1>
        <div className={ProfileStyles.container}>
          <p>
            <img
              src={user.avatar}
              alt="аватар"
              width="200"
            />
          </p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button
            disabled={isLoading}
            type="button"
            className="btn btn-action"
            onClick={logoutHandler}
          >
            Выйти
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className={ProfileStyles.Profile}>
      <h1>Личный кабинет</h1>
      <p>Произошла ошибка: {error}</p>
    </div>
  )
}

export default Profile
