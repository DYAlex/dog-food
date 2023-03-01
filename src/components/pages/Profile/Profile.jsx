import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getUserSelector, setUserToken } from '../../../redux/slices/userSlice'
import { withQuery } from '../../../HOCs/withQuery'
import ProfileStyles from './Profile.module.css'

function ProfileInner({ user, isLoading }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log({ user })

  const logoutHandler = () => {
    console.log('Logging out')
    dispatch(setUserToken(''))
    navigate('/')
  }
  // if (user) {
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
        <p>
          Имя:
          {' '}
          {user.name}
        </p>
        <p>
          Информация:
          {' '}
          {user.about}
        </p>
        <p>
          Группа:
          {' '}
          {user.group}
        </p>
        <p>
          Почта:
          {' '}
          {user.email}
        </p>
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
  // }
}

const ProfileInnerWithQuery = withQuery(ProfileInner)

function Profile() {
  const { token } = useSelector(getUserSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  }, [token])
  const {
    data: user,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => dogFoodApi.getUser(token),
  })

  return (
    <ProfileInnerWithQuery
      user={user}
      refetch={refetch}
      isError={isError}
      isLoading={isLoading}
      error={error}
    />
  )
}

export default Profile
