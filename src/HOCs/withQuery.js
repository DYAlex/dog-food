/* eslint-disable func-names */
import { useNavigate } from 'react-router-dom'
import { ActionButton } from '../components/CommonUI/Buttons/ActionButton'
import { RegularButton } from '../components/CommonUI/Buttons/RegularButton'
import { Loader } from '../components/CommonUI/Loader/Loader'
import withQueryStyles from './withQuery.module.css'

export const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, refetch, ...rest
}) {
  const navigate = useNavigate()
  const goBackHandler = () => {
    navigate(0 ?? '/')
  }
  if (isError) {
    return (
      <div className={withQueryStyles.error}>
        <p>
          Произошла ошибка:
          {' '}
          {error.message}
        </p>

        <ActionButton btnName="Повторить" clickHandler={refetch} />
        <RegularButton btnName="Назад" clickHandler={goBackHandler} />
      </div>
    )
  }

  if (isLoading) return <Loader />

  return <WrappedComponent {...rest} />
}
