/* eslint-disable func-names */
import { useNavigate } from 'react-router-dom'
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

        <button
          onClick={refetch}
          type="button"
          className="btn btn-action"
        >
          Повторить
        </button>
        <button
          onClick={goBackHandler}
          type="button"
          className="btn"
        >
          Назад
        </button>
      </div>
    )
  }

  if (isLoading) return <Loader />

  return <WrappedComponent {...rest} />
}
