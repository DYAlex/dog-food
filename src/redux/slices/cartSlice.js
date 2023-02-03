import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {

  },
})

// export const {
//   setUserGroup, setUserName, setUserEmail, setUserToken,
// } = cartSlice.actions
export const getCartSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
