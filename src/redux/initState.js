import { LS_KEY } from './constants'
import { validateDataFromLS } from './utils/functions'

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    token: '',
    id: '',
  },
  cart: {},
  favorites: {},
  filter: {
    search: '',
  },
}

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(LS_KEY)
  if (dataFromLS && typeof JSON.parse(dataFromLS) === 'object') {
    const isDataFromLS = validateDataFromLS(initState, JSON.parse(dataFromLS))
    if (isDataFromLS) {
      return JSON.parse(dataFromLS)
    }
  }
  return initState
}
