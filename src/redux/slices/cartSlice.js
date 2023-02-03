/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    addCartItem(state, action) {
      console.log(state, action.payload)
      if (action.payload.id in state) {
        // eslint-disable-next-line max-len
        // console.log(`${action.payload} есть в Корзине в количестве ${state[action.payload].count}`)
        if (state[action.payload.id].count < action.payload.stock) {
          state[action.payload.id].count += 1
        }
        // eslint-disable-next-line max-len
        console.log(`${action.payload.id} теперь есть в Корзине в количестве ${state[action.payload.id].count}`)
      } else {
        const newItem = {
          [action.payload.id]: {
            count: 1,
            isChecked: false,
          },
        }
        // console.log({ newItem })
        Object.assign(state, newItem)
        // console.log(state)
        // console.log(state[action.payload])
      }
    },
    removeItemFromCart(state, action) {
      if (action.payload in state) {
        // eslint-disable-next-line max-len
        // console.log(`${action.payload} есть в Корзине в количестве ${state[action.payload].count}`)
        if (state[action.payload].count > 1) {
          state[action.payload].count -= 1
        }
        // eslint-disable-next-line max-len
        console.log(`${action.payload} теперь в Корзине в количестве ${state[action.payload].count}`)
      }
    },
  },
})

export const { addCartItem, removeItemFromCart } = cartSlice.actions
export const getCartSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
