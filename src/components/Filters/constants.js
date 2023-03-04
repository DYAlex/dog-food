export const LOW_PRICE = {
  type: 'LOW_PRICE',
  name: 'Сначала дешевые',
}

export const HIGH_PRICE = {
  type: 'HIGH_PRICE',
  name: 'Сначала дорогие',
}

export const SALES = {
  type: 'SALES',
  name: 'Распродажа',
}

export const NEW = {
  type: 'NEW',
  name: 'Сначала новые',
}

export const OLD = {
  type: 'OLD',
  name: 'Сначала старые',
}

export const MOST_POPULAR = {
  type: 'MOST_POPULAR',
  name: 'Самые популярные',
}

export const LEAST_POPULAR = {
  type: 'LEAST_POPULAR',
  name: 'Наименее популярные',
}

export const FILTERS = [LOW_PRICE, HIGH_PRICE, SALES, NEW, OLD, MOST_POPULAR, LEAST_POPULAR]

export const FILTER_QUERY_NAME = 'filterType'

const averageRating = (reviews) => {
  if (reviews.length) {
    const sum = reviews.reduce((a, b) => {
      if (b.rating) {
        return a + b.rating
      }
      return a
    }, 0)
    // console.log(`averageRating of ${name} is `, sum / reviews.length)
    return sum / reviews.length
  }
  return 0
}

export const getFilteredProducts = ([...products], filterType) => {
  // console.log('from getFilteredProducts', { filterType })
  switch (filterType) {
    case LOW_PRICE.type:
      // console.log('Sort by cheapest')
      return products.sort((a, b) => a.price - b.price)
    case HIGH_PRICE.type:
      // console.log('Sort by expensive first')
      return products.sort((a, b) => b.price - a.price)
    case SALES.type:
      // console.log('Sort by on sale')
      return products.filter((product) => !!product.discount)
    case NEW.type:
      // console.log('Sort by newest')
      return products.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    case OLD.type:
      // console.log('Sort by oldest')
      return products.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at))
    case MOST_POPULAR.type:
      // console.log('Sort by most popular')
      return products.sort((a, b) => averageRating(b.reviews) - averageRating(a.reviews))
    case LEAST_POPULAR.type:
      // console.log('Sort by least popular')
      return products.sort((a, b) => averageRating(a.reviews) - averageRating(b.reviews))
    default:
      return products
  }
}
