import { configureStore } from '@reduxjs/toolkit'
import { dogFoodApi } from '../api/DogFoodApi'
import { DF_TOKEN_KEY } from './constants'
import { getInitState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  preloadedState: getInitState(),
})

dogFoodApi.setToken(store.getState().user.token)

store.subscribe(() => {
  window.localStorage.setItem(DF_TOKEN_KEY, JSON.stringify(store.getState()))
})

store.subscribe(() => {
  dogFoodApi.setToken(store.getState().user.token)
})
