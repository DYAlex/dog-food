import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  const [isEditUserInfoModalOpen, setIsEditUserInfoModalOpen] = useState(false)
  const [isEditUserAvatarModalOpen, setIsEditUserAvatarModalOpen] = useState(false)
  // console.log({ user })

  const {
    mutateAsync: editUserInfoMutateAsync,
    isError: editUserInfoIsError,
    error: editUserInfoError,
    isSuccess: editUserInfoIsSuccess,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.editUserInfo(values, token).then(),
  })

  const openEditUserInfoModalHandler = () => {
    if (!isEditUserInfoModalOpen) {
      setIsEditUserInfoModalOpen(true)
    }
  }

  const closeEditUserInfoModalHandler = () => {
    if (isEditUserInfoModalOpen) {
      setIsEditUserInfoModalOpen(false)
    }
  }

  // eslint-disable-next-line max-len
  if (editUserInfoIsError) console.log('Произошла ошибка при редактировании информации о пользователе', editUserInfoError)
  if (editUserInfoIsSuccess) {
    queryClient.invalidateQueries(['currentUser'])
  }

  const editUserInfoHandler = async (values) => {
    await editUserInfoMutateAsync(values)
    closeEditUserInfoModalHandler()
  }

  const {
    mutateAsync: editUserAvatarMutateAsync,
    isError: editUserAvatarIsError,
    error: editUserAvatarError,
    isSuccess: editUserAvatarIsSuccess,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.editUserAvatar(values, token).then(),
  })

  // eslint-disable-next-line max-len
  if (editUserAvatarIsError) console.log('Произошла ошибка при редактировании информации о пользователе', editUserAvatarError)
  if (editUserAvatarIsSuccess) {
    queryClient.invalidateQueries(['currentUser'])
    closeEditUserInfoModalHandler()
  }

  const openEditUserAvatarModalHandler = () => {
    if (!isEditUserAvatarModalOpen) {
      setIsEditUserAvatarModalOpen(true)
    }
  }
  const closeEditUserAvatarModalHandler = () => {
    if (isEditUserAvatarModalOpen) {
      setIsEditUserAvatarModalOpen(false)
    }
  }

  const editUserAvatarHandler = async (values) => {
    await editUserAvatarMutateAsync(values)
    setIsEditUserAvatarModalOpen(false)
  }

  const logoutHandler = () => {
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
            btnName="Изменить фото"
            clickHandler={openEditUserAvatarModalHandler}
            disabled={isLoading}
          />
          <RegularButton
            btnName="Редактировать"
            clickHandler={openEditUserInfoModalHandler}
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
        closeModalHandler={closeEditUserInfoModalHandler}
        user={user}
        editUserInfoHadler={editUserInfoHandler}
      />
      <EditUserAvatarModal
        isOpen={isEditUserAvatarModalOpen}
        closeModalHandler={closeEditUserAvatarModalHandler}
        editUserAvatarHadler={editUserAvatarHandler}
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
