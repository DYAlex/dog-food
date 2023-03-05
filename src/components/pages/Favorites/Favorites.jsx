import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { getUserSelector } from '../../../redux/slices/userSlice'
import { withQuery } from '../../../HOCs/withQuery'
import FavoritesItem from './FavoritesItem/FavoritesItem'
import FavoritesPageStyles from './Favorites.module.css'
import { getFavoritesSelector } from '../../../redux/slices/favoritesSlice'
import { ErrorItem } from '../../CommonUI/ErrorItem/ErrorItem'

function FavoritesPageInner({
  products, notFoundIds = null,
}) {
  return (
    <div className={FavoritesPageStyles.CartPage}>
      <h1 className={FavoritesPageStyles.header}>Избранное</h1>
      <div className={FavoritesPageStyles.cartContent}>
        <div className={FavoritesPageStyles.cartItems}>
          <div className={FavoritesPageStyles.container}>
            {products.map(({ _id: id, ...restProduct }) => (
              <FavoritesItem
                key={id}
                id={id}
                product={restProduct}
              />
            ))}
            {notFoundIds?.length
              ? notFoundIds.map((id) => (
                <ErrorItem
                  key={id}
                  id={id}
                  // eslint-disable-next-line react/jsx-boolean-value
                  isFavorite={true}
                />
              ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

const FavoritesPageInnerWithQuery = withQuery(FavoritesPageInner)

function FavoritesPage() {
  const { token } = useSelector(getUserSelector)
  const navigate = useNavigate()
  const favorites = useSelector(getFavoritesSelector)
  const ids = Object.keys(favorites)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [token])

  const {
    data: products,
    isError,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['favorites', ids, token],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
    enabled: !!token,
    keepPreviousData: true,
  })

  if (!ids?.length) {
    return (
      <div className={FavoritesPageStyles.CartPage}>
        <h1 className={FavoritesPageStyles.header}>Избранное</h1>
        <div className={FavoritesPageStyles.containerEmpty}>
          <h3>Здесь пока ничего нет</h3>
          <Link to="/products">Наши товары</Link>
          <Link to="/profile">Личный кабинет</Link>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line max-len, no-underscore-dangle
  const productsFiltered = products && products.filter((productFromServer) => ids.includes(productFromServer._id))

  if (isSuccess && ids.length > productsFiltered.length) {
    // eslint-disable-next-line max-len, no-underscore-dangle
    const notFoundIds = ids.filter((favoriteId) => !productsFiltered.find((product) => favoriteId === product._id))
    return (
      <FavoritesPageInnerWithQuery
        products={productsFiltered}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        favorites={favorites}
        notFoundIds={notFoundIds}
      />
    )
  }

  if (isSuccess && ids.length === productsFiltered.length) {
    return (
      <FavoritesPageInnerWithQuery
        products={productsFiltered}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        favorites={favorites}
      />
    )
  }
}

export default FavoritesPage
