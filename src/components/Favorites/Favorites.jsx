import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { getUserSelector } from '../../redux/slices/userSlice'
import { withQuery } from '../HOCs/withQuery'
import FavoritesItem from './FavoritesItem/FavoritesItem'
import FavoritesPageStyles from './Favorites.module.css'
import { getFavoritesSelector } from '../../redux/slices/favoritesSlice'

function FavoritesPageInner({
  products,
}) {
  // eslint-disable-next-line max-len
  // console.log('cart, products', JSON.parse(JSON.stringify(cart)), JSON.parse(JSON.stringify(products)))
  // console.log('products.length, cart.length', products.length, Object.keys(cart).length)
  // const dispatch = useDispatch()
  console.log({ products })

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
  // console.log({ ids })

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
    refetch,
  } = useQuery({
    queryKey: ['favorites', ids, token],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
    enabled: !!token,
    keepPreviousData: true,
  })

  // eslint-disable-next-line max-len, no-underscore-dangle
  const productsFiltered = products && products.filter((productFromServer) => ids.includes(productFromServer._id))

  if (!products?.length) {
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

  if (ids.length === productsFiltered.length) {
    return (
      <FavoritesPageInnerWithQuery
        products={products}
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
