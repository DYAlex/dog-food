import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getUserSelector, setUserToken } from '../../../redux/slices/userSlice'
import { withQuery } from '../../../HOCs/withQuery'
import ProfileStyles from './Profile.module.css'
import { ActionButton } from '../../CommonUI/Buttons/ActionButton'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { DangerButton } from '../../CommonUI/Buttons/DangerButton'
import { EditUserInfoModal } from '../../Modal/EditUserInfoModal/EditUserInfoModal'
import { EditUserAvatarModal } from '../../Modal/EditUserAvatarModal/EditUserAvatarModal'

function ProfileInner({ user, isLoading, token }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isEditUserInfoModalOpen, setIsEditUserInfoModalOpen] = useState(false)
  const [isEditUserAvatarModalOpen, setIsEditUserAvatarModalOpen] = useState(false)
  // console.log({ user })

  const logoutHandler = () => {
    // console.log('Logging out')
    dispatch(setUserToken(''))
    navigate('/')
  }

  const editUserInfoModalHandler = () => {
    setIsEditUserInfoModalOpen(true)
  }

  const editUserAvatarModalHandler = () => {
    setIsEditUserAvatarModalOpen(true)
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
            btnName="Изменить фото"
            clickHandler={editUserAvatarModalHandler}
            disabled={isLoading}
          />
          <RegularButton
            btnName="Редактировать"
            clickHandler={editUserInfoModalHandler}
            disabled={isLoading}
          />
          <DangerButton
            btnName="Выйти"
            clickHandler={logoutHandler}
            disabled={isLoading}
          />
        </div>
      </div>
      <EditUserInfoModal
        isOpen={isEditUserInfoModalOpen}
        setIsOpen={setIsEditUserInfoModalOpen}
        token={token}
        user={user}
      />
      <EditUserAvatarModal
        isOpen={isEditUserAvatarModalOpen}
        setIsOpen={setIsEditUserAvatarModalOpen}
        token={token}
        user={user}
      />
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
      token={token}
    />
  )
}

export default Profile
