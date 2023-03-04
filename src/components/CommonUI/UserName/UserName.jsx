import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getUserSelector } from '../../../redux/slices/userSlice'

export function UserName({ id }) {
  const { token } = useSelector(getUserSelector)
  // console.log({ id })
  const {
    data: user,
    // isError,
    // error,
    // isLoading,
    // refetch,
  } = useQuery({
    queryKey: ['userId', id],
    queryFn: () => dogFoodApi.getUserById(id, token),
  })

  if (user) {
    // console.log({ user })
    return (<b>{user.name}</b>)
  }
}
