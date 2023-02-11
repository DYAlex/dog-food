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
  if (dataFromLS) {
    const isDataFromLS = validateDataFromLS(initState, JSON.parse(dataFromLS))
    console.log({ isDataFromLS })
    if (isDataFromLS) {
      console.log('dataFromLS', JSON.parse(dataFromLS))
      return JSON.parse(dataFromLS)
    }
    console.log({ initState })
  }
  return initState
  // return dataFromLS ? JSON.parse(dataFromLS) : initState
}
