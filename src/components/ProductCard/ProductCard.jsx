import ProductCardStyles from './ProductCard.module.css'

function ProductCard({ product }) {
  if (product) {
    const addToCartHandler = () => {
      console.log('Product added to cart')
    }

    return (
      <div className={ProductCardStyles.card}>
        <div className={ProductCardStyles.imageWr}>
          <img
            src={product.pictures}
            alt="Фото товара"
            width="150"
          />
        </div>
        <p>
          {product.price}
          &nbsp;&#8381;
        </p>
        <p>{product.wight}</p>
        <p>{product.name}</p>
        <button
          type="button"
          className="btn btn-action"
          onClick={addToCartHandler}
        >
          В корзину
        </button>
      </div>
    )
  }
}

export default ProductCard
