import { DF_TOKEN_KEY } from './constants'

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

  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
