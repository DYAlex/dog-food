import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { addCartItem, getCartSelector } from '../../redux/slices/cartSlice'
import {
  addToFavorites,
  getFavoritesSelector,
  removeFromFavorites,
} from '../../redux/slices/favoritesSlice'
import { getUserSelector } from '../../redux/slices/userSlice'
import { QuantityController } from '../CommonUI/QuantityController/QuantityController'
import { UserName } from '../CommonUI/UserName/UserName'
import { withQuery } from '../HOCs/withQuery'
import ProductDetailStyles from './ProductDetail.module.css'

function ProductDetailInner({ product, id }) {
  const dispatch = useDispatch()
  const cart = useSelector(getCartSelector)
  const favorites = useSelector(getFavoritesSelector)
  const [isFavorite, setIsFavorite] = useState(favorites[id]?.isFavorite)

  // console.log({ product })

  const addToCartHandler = () => {
    // console.log('Product added to cart', product.name)
    const { stock } = product
    dispatch(addCartItem({ id, stock }))
  }

  const addToFavsHandler = () => {
    if (!isFavorite) {
      // console.log('Product added to favorites', id)
      setIsFavorite(() => !isFavorite)
      return dispatch(addToFavorites(id))
    }
    // console.log('Product removed from favorites', id)
    setIsFavorite(() => !isFavorite)
    return dispatch(removeFromFavorites(id))
  }

  if (product) {
    return (
      <div className={ProductDetailStyles.ProductDetail}>
        <h2>{product.name}</h2>
        <div className={ProductDetailStyles.container}>
          <p>
            <img
              src={product.pictures}
              alt="аватар"
              width="300"
            />
          </p>
          <p className={ProductDetailStyles.name}>{product.name}</p>
          <p className={ProductDetailStyles.price}>
            {product.price}
            &nbsp;&#8381;
          </p>
          <p className={ProductDetailStyles.weight}>{product.wight}</p>
          <p className={ProductDetailStyles.description}>{product.description}</p>
          {cart[id]
            ? (<QuantityController id={id} stock={product.stock} />)
            : (
              <button
                disabled={!product.available}
                type="button"
                className="btn btn-action"
                onClick={addToCartHandler}
              >
                В корзину
              </button>
            )}
          <button
            type="button"
            className="btn"
            onClick={addToFavsHandler}
          >
            {isFavorite ? 'Убрать из избранного' : 'В избранное'}
          </button>
        </div>
        <div className={ProductDetailStyles.reviewFormWr}>
          Здесь должна быть форма для добавления отзыва
        </div>
        <div className={ProductDetailStyles.reviewsWr}>
          <hr />
          <h3>Все отзывы</h3>
          {product.reviews.map(({ _id: reviewId, ...review }) => (
            <div key={reviewId} className={ProductDetailStyles.review}>
              <p className={ProductDetailStyles.reviewAuthor}>
                <UserName id={review.author} />
              </p>
              <div className={ProductDetailStyles.reviewInfo}>
                <p className={ProductDetailStyles.reviewDate}>
                  {String(String(review.created_at).split('T', 1)).replaceAll('-', '.')}
                </p>
                <p className={ProductDetailStyles.rating}>
                  Рейтинг
                  {' '}
                  {review.rating}
                </p>
              </div>
              <p className={ProductDetailStyles.reviewText}>
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const ProductDetailInnerWithQuery = withQuery(ProductDetailInner)

function ProductDetail() {
  const { token } = useSelector(getUserSelector)
  const { productId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })
  const {
    data: product,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['productId', productId],
    queryFn: () => dogFoodApi.getProductById(productId, token),
  })

  return (
    <ProductDetailInnerWithQuery
      product={product}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      id={productId}
    />
  )
}

export default ProductDetail
