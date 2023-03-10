/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dogFoodApi } from '../../../api/DogFoodApi'
import { addCartItem, getCartSelector } from '../../../redux/slices/cartSlice'
import {
  addToFavorites,
  getFavoritesSelector,
  removeFromFavorites,
} from '../../../redux/slices/favoritesSlice'
import { getUserSelector } from '../../../redux/slices/userSlice'
import { AddReview } from './AddReview/AddReview'
import { QuantityController } from '../../CommonUI/QuantityController/QuantityController'
// import { UserName } from '../../CommonUI/UserName/UserName'
import { withQuery } from '../../../HOCs/withQuery'
import { DeleteProductModal } from '../../Modal/DeleteProductModal/DeleteProductModal'
import { EditProductModal } from '../../Modal/EditProductModal/EditProductModal'
import ProductDetailStyles from './ProductDetail.module.css'
import { ActionButton } from '../../CommonUI/Buttons/ActionButton'
import { RegularButton } from '../../CommonUI/Buttons/RegularButton'
import { DangerButton } from '../../CommonUI/Buttons/DangerButton'

function ProductDetailInner({ product, id, token }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(getCartSelector)
  const user = useSelector(getUserSelector)
  const favorites = useSelector(getFavoritesSelector)
  const [isFavorite, setIsFavorite] = useState(favorites[id]?.isFavorite)
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false)
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false)
  // eslint-disable-next-line no-underscore-dangle
  const isProductAuthor = product.author._id === user.id
  const queryClient = useQueryClient()

  const {
    data: reviews,
    isError: reviewsIsError,
    error: reviewsError,
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => dogFoodApi.getReviewByProductId(id, token),
    enabled: !!id,
  })
  if (reviewsIsError) console.log('?????????????????? ???????????? ?????? ???????????????? ?????????????? ', reviewsError)
  console.log({ reviews })

  const {
    mutateAsync: deleteReviewByIdMutateAsync,
    isError: deleteReviewByIdIsError,
    error: deleteReviewByIdError,
    isSuccess: deleteReviewByIdIsSuccess,
  } = useMutation({
    mutationFn: (reviewId) => dogFoodApi.deleteReviewById(reviewId, id, token).then(),
  })
  // eslint-disable-next-line max-len
  if (deleteReviewByIdIsError) console.log('?????????????????? ???????????? ?????? ???????????????? ????????????', deleteReviewByIdError)
  if (deleteReviewByIdIsSuccess) {
    queryClient.invalidateQueries(['reviews'])
  }

  const deleteReviewHandler = async (reviewId) => {
    await deleteReviewByIdMutateAsync(reviewId)
  }

  const openDeleteProductModalHandler = () => {
    if (!isDeleteProductModalOpen) {
      setIsDeleteProductModalOpen(true)
    }
  }

  const closeDeleteProductModalHandler = () => {
    if (isDeleteProductModalOpen) {
      setIsDeleteProductModalOpen(false)
    }
  }

  const {
    mutateAsync: deleteProductByIdMutateAsync,
    isError: deleteProductByIdIsError,
    error: deleteProductByIdError,
    isSuccess: deleteProductByIdIsSuccess,
  } = useMutation({
    mutationFn: (productId) => dogFoodApi.deleteProductById(productId, token),
  })
  // eslint-disable-next-line max-len
  if (deleteProductByIdIsError) console.log('?????????????????? ???????????? ?????? ???????????????? ????????????', deleteProductByIdError)
  if (deleteProductByIdIsSuccess) {
    queryClient.invalidateQueries()
  }

  const deleteProductByIdHandler = () => {
    // if (isFavorite) {
    //   console.log('Removing from favs before deleting product')
    //   setIsFavorite(() => !isFavorite)
    //   dispatch(removeFromFavorites(id))
    // }
    // if (cart[id]) {
    //   console.log('Removing from cart before deleting product')
    //   dispatch(deleteItemFromCart(id))
    // }
    deleteProductByIdMutateAsync(id)
    closeDeleteProductModalHandler()
    navigate('/products')
  }

  const openEditProductModalHandler = () => {
    if (!isEditProductModalOpen) {
      setIsEditProductModalOpen(true)
    }
  }

  const closeEditProductModalHandler = () => {
    if (isEditProductModalOpen) {
      setIsEditProductModalOpen(false)
    }
  }

  const {
    mutateAsync: editProductByIdMutateAsync,
    isError: editProductByIdIsError,
    error: editProductByIdError,
    isSuccess: editProductByIdIsSuccess,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.editProductById(id, token, values).then(),
  })

  // eslint-disable-next-line max-len
  if (editProductByIdIsError) console.log('?????????????????? ???????????? ?????? ???????????????????????????? ????????????', editProductByIdError)
  if (editProductByIdIsSuccess) {
    queryClient.invalidateQueries(['productId'])
  }

  const editProductHandler = async (values) => {
    await editProductByIdMutateAsync(values)
    queryClient.invalidateQueries(['productId'])
    closeEditProductModalHandler()
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
              alt="????????????"
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
              <ActionButton
                btnName="?? ??????????????"
                clickHandler={addToCartHandler}
                disabled={!product.available}
              />
            )}
          <RegularButton
            btnName={isFavorite ? '???????????? ???? ????????????????????' : '?? ??????????????????'}
            clickHandler={addToFavsHandler}
          />
          {isProductAuthor
            ? (
              <>
                <RegularButton
                  btnName="??????????????????????????"
                  clickHandler={openEditProductModalHandler}
                />
                <DangerButton
                  btnName="??????????????"
                  clickHandler={openDeleteProductModalHandler}
                />
              </>
            )
            : null}
        </div>
        <div className={ProductDetailStyles.reviewFormWr}>
          <AddReview productId={id} />
        </div>
        <div className={ProductDetailStyles.reviewsWr}>
          <hr />
          <h3>?????? ????????????</h3>
          {reviews && reviews.map(({ _id: reviewId, ...review }) => (
            <div key={reviewId} className={ProductDetailStyles.review}>
              <p className={ProductDetailStyles.reviewAuthor}>
                {review.author.name}
              </p>
              <div className={ProductDetailStyles.reviewInfo}>
                <p className={ProductDetailStyles.reviewDate}>
                  {String(String(review.created_at).split('T', 1)).replaceAll('-', '.')}
                </p>
                <p className={ProductDetailStyles.rating}>
                  ??????????????
                  {' '}
                  {review.rating}
                </p>
              </div>
              <p className={ProductDetailStyles.reviewText}>
                {review.text}
              </p>
              {review.author._id === user.id
                ? (
                  <DangerButton
                    btnName="?????????????? ??????????"
                    clickHandler={() => deleteReviewHandler(reviewId)}
                  />
                )
                : null}
            </div>
          ))}
        </div>
        <DeleteProductModal
          isOpen={isDeleteProductModalOpen}
          closeHandler={closeDeleteProductModalHandler}
          title={product.name}
          deleteProductHandler={deleteProductByIdHandler}
        />
        <EditProductModal
          isOpen={isEditProductModalOpen}
          closeHandler={closeEditProductModalHandler}
          editProductHandler={editProductHandler}
          product={product}
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
