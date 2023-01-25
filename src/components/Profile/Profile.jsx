/* eslint-disable react/jsx-one-expression-per-line */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { useQueryContext } from '../../contexts/QueryContextProvider'
import { Loader } from '../Loader/Loader'
import ProfileStyles from './Profile.module.css'

function Profile() {
  const { token, setToken } = useQueryContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      // console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })

  const {
    // data, isLoading, isError, error, refetch,
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => dogFoodApi.getUser(),
  })

  if (isLoading) {
    return <Loader />
  }

  const logoutHandler = () => {
    // console.log('Logging out')
    setToken('')
    dogFoodApi.setToken('')
    setTimeout(navigate('/'))
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
