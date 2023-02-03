/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    // addCartItem: {
    //   reducer(state, action) {
    //     console.log(state, action.payload)
    //     // state[action.payload] = 'test string'
    //     // console.log(state[action.payload])
    //   },
    //   prepare(id) {
    //     console.log({ id })
    //     return {
    //       payload: {},
    //     }
    //   },
    // },
    addCartItem(state, action) {
      // console.log(state, action.payload)
      state[action.payload] = {}
      // console.log(state[action.payload])
    },
  },
})

export const { addCartItem } = cartSlice.actions
export const getCartSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
