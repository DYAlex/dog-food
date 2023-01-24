import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import ProductCardStyles from './ProductCard.module.css'

function ProductCard({ product }) {
  if (product) {
    console.log(JSON.stringify(product))
    const addToCartHandler = () => {
      console.log('Product added to cart')
    }

    return (
      <div className={ProductCardStyles.card}>
        <FontAwesomeIcon icon={faHeart} className={ProductCardStyles.icon} />
        <div className={ProductCardStyles.imageWr}>
          <img
            src={product.pictures}
            alt="Фото товара"
            width="150"
          />
        </div>
        <div className={ProductCardStyles.cardContent}>
          <p className={ProductCardStyles.price}>
            {product.price}
            &nbsp;&#8381;
          </p>
          <p className={ProductCardStyles.weight}>{product.wight}</p>
          <p className={ProductCardStyles.name}>{product.name}</p>
          <button
            type="button"
            className="btn btn-action"
            onClick={addToCartHandler}
          >
            В корзину
          </button>
        </div>
      </div>
    )
  }
}

export default ProductCard
