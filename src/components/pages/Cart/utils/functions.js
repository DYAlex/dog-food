export const getTotalItems = (cart) => Object.keys(cart).reduce((acc, cartItem) => {
  if (cart[cartItem].isChecked) {
    const sum = acc + cart[cartItem].count
    return sum
  }
  return acc
}, 0)

export const getIsAllChecked = (cart) => Object.keys(cart).reduce((acc, cartItem) => {
  if (!cart[cartItem].isChecked) {
    return false
  }
  return acc
}, true)

export const getAllCheckedItems = (cart) => {
  const allCheckedItems = []
  Object.keys(cart).forEach((item) => {
    if (cart[item].isChecked) allCheckedItems.push(item)
  })
  // console.log({ allCheckedItems })
  return allCheckedItems
}

// eslint-disable-next-line no-underscore-dangle
export const getItemById = (itemId, products) => (products.find((item) => item._id === itemId))

export const getPriceFullTotal = (cart, products) => (
  getAllCheckedItems(cart).reduce((total, item) => {
    const product = getItemById(item, products)
    const sum = total + cart[item].count * product.price
    return sum
  }, 0)
)

export const getDiscountTotal = (cart, products) => (
  getAllCheckedItems(cart).reduce((total, item) => {
    const product = getItemById(item, products)
    const sum = total + cart[item].count * ((product.price * product.discount) / 100)
    return sum
  }, 0)
)

export const getProductTitles = ([...ids], products) => {
  const titles = []
  for (let i = 0, n = ids.length; i < n; i += 1) {
    titles.push(getItemById(ids[i], products).name)
  }
  return titles
}
