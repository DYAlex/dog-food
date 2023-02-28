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
import { AddReview } from '../AddReview/AddReview'
import { QuantityController } from '../CommonUI/QuantityController/QuantityController'
import { UserName } from '../CommonUI/UserName/UserName'
import { withQuery } from '../HOCs/withQuery'
import { DeleteProductModal } from '../Modal/DeleteProductModal/DeleteProductModal'
import { EditProductModal } from '../Modal/EditProductModal/EditProductModal'
import ProductDetailStyles from './ProductDetail.module.css'

function ProductDetailInner({ product, id, token }) {
  const dispatch = useDispatch()
  const cart = useSelector(getCartSelector)
  const user = useSelector(getUserSelector)
  const favorites = useSelector(getFavoritesSelector)
  const [isFavorite, setIsFavorite] = useState(favorites[id]?.isFavorite)
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false)
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false)
  // eslint-disable-next-line no-underscore-dangle
  const isAuthor = product.author._id === user.id

  // console.log({ isAuthor })

  const openDeleteProductModalHandler = () => {
    setIsDeleteProductModalOpen(true)
  }

  const openEditProductModalHandler = () => {
    setIsEditProductModalOpen(true)
  }

  const addToCartHandler = () => {
    const { stock } = product
    dispatch(addCartItem({ id, stock }))
  }

  const addToFavsHandler = () => {
    if (!isFavorite) {
      setIsFavorite(() => !isFavorite)
      return dispatch(addToFavorites(id))
    }
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
          {isAuthor
            ? (
              <>
                <button
                  disabled={!product.available}
                  type="button"
                  className="btn btn-action"
                  onClick={openEditProductModalHandler}
                >
                  Редактировать
                </button>
                <button
                  disabled={!product.available}
                  type="button"
                  className="btn btn-danger"
                  onClick={openDeleteProductModalHandler}
                >
                  Удалить
                </button>
              </>
            )
            : null}
        </div>
        <div className={ProductDetailStyles.reviewFormWr}>
          <AddReview productId={id} />
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
        <DeleteProductModal
          isOpen={isDeleteProductModalOpen}
          setIsOpen={setIsDeleteProductModalOpen}
          title={product.name}
          id={id}
          token={token}
        />
        <EditProductModal
          isOpen={isEditProductModalOpen}
          setIsOpen={setIsEditProductModalOpen}
          product={product}
          id={id}
          token={token}
        />
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
      // console.log('Redirecting to SignIn page')
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
    enabled: !!productId,
  })

  return (
    <ProductDetailInnerWithQuery
      product={product}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      id={productId}
      token={token}
    />
  )
}

export default ProductDetail
