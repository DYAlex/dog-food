import { configureStore } from '@reduxjs/toolkit'
import { LS_KEY } from './constants'
import { getInitState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { favoritesReducer } from './slices/favoritesSlice'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
    favorites: favoritesReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  window.localStorage.setItem(LS_KEY, JSON.stringify(store.getState()))
})
