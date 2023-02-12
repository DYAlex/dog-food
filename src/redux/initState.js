import { DF_TOKEN_KEY } from './constants'
import { validateDataFromLS } from './utils/functions'

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    token: '',
  },
  cart: {},
  filter: {
    search: '',
  },
}

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(DF_TOKEN_KEY)
  // console.log({ dataFromLS })
  if (dataFromLS && typeof JSON.parse(dataFromLS) === 'object') {
    // console.log('dataFromLS is an object')
    const isDataFromLS = validateDataFromLS(initState, JSON.parse(dataFromLS))
    // console.log({ isDataFromLS })
    if (isDataFromLS) {
      // console.log('dataFromLS', JSON.parse(dataFromLS))
      return JSON.parse(dataFromLS)
    }
    // console.log('dataFromLS is incorrect')
  }
  return initState
  // return dataFromLS ? JSON.parse(dataFromLS) : initState
}
