import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getUserSelector, setUserToken } from '../../../redux/slices/userSlice'
import { withQuery } from '../../../HOCs/withQuery'
import ProfileStyles from './Profile.module.css'
import { ActionButton } from '../../CommonUI/Buttons/ActionButton'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { DangerButton } from '../../CommonUI/Buttons/DangerButton'

function ProfileInner({ user, isLoading }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log({ user })

  const logoutHandler = () => {
    // console.log('Logging out')
    dispatch(setUserToken(''))
    navigate('/')
  }

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
        <div className={ProfileStyles.btnWr}>
          <ActionButton
            btnName="Выйти"
            clickHandler={logoutHandler}
            disabled={isLoading}
          />
          <RegularButton
            btnName="Выйти"
            clickHandler={logoutHandler}
            disabled={isLoading}
          />
          <DangerButton
            btnName="Выйти"
            clickHandler={logoutHandler}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

const ProfileInnerWithQuery = withQuery(ProfileInner)

function Profile() {
  const { token } = useSelector(getUserSelector)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
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
