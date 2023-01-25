import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dogFoodApi } from '../../api/DogFoodApi'
import { useQueryContext } from '../../contexts/QueryContextProvider'
import { withQuery } from '../HOCs/withQuery'
import ProductDetailStyles from './ProductDetail.module.css'

function ProductDetailInner({ product }) {
  const { token } = useQueryContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      // console.log('Redirecting to SignIn page')
      navigate('/signin')
    }
  })

  const addToCartHandler = () => {
    console.log('Product added to cart')
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
          <button
            disabled={!product.available}
            type="button"
            className="btn btn-action"
            onClick={addToCartHandler}
          >
            В корзину
          </button>
        </div>
        <div className={ProductDetailStyles.reviewsWr}>
          {product.reviews.map(({ _id: id, ...review }) => (
            <div key={id} className={ProductDetailStyles.review}>
              <p className={ProductDetailStyles.rating}>{review.rating}</p>
              <p className={ProductDetailStyles.reviewAuthor}>{review.author}</p>
              <p className={ProductDetailStyles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const ProductDetailInnerWithQuery = withQuery(ProductDetailInner)

function ProductDetail() {
  // const { token } = useQueryContext()
  const { productId } = useParams()
  const {
    data: product,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['productId', productId],
    queryFn: () => dogFoodApi.getProductById(productId),
  })

  return (
    <ProductDetailInnerWithQuery
      product={product}
      isError={isError}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    />
  )
}

export default ProductDetail
