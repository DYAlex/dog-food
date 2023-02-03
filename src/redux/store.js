import { configureStore } from '@reduxjs/toolkit'
import { initState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    filter: filterReducer,
  },
  preloadedState: initState,
})
