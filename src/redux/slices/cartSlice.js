/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitState(),
  reducers: {
    addCartItem(state, action) {
      // console.log(state, action.payload)
      if (action.payload.id in state) {
        if (state[action.payload.id].count < action.payload.stock) {
          state[action.payload.id].count += 1
        }
        // eslint-disable-next-line max-len
        // console.log(`${action.payload.id} теперь есть в Корзине в количестве ${state[action.payload.id].count}`)
      } else {
        const newItem = {
          [action.payload.id]: {
            count: 1,
            isChecked: true,
          },
        }
        Object.assign(state, newItem)
      }
    },
    removeItemFromCart(state, action) {
      if (action.payload in state) {
        if (state[action.payload].count > 1) {
          state[action.payload].count -= 1
        }
        // eslint-disable-next-line max-len
        // console.log(`${action.payload} теперь в Корзине в количестве ${state[action.payload].count}`)
      }
    },
    deleteItemFromCart(state, action) {
      delete state[action.payload]
    },
    changeIsChecked(state, action) {
      // console.log(state, action.payload)
      if (action.payload in state) {
        // console.log('Object found in cart', action.payload)
        state[action.payload].isChecked = !state[action.payload].isChecked
      }
    },
    checkAll(state, action) {
      // console.log(state, action.payload)
      action.payload.forEach((id) => {
        state[id].isChecked = true
      })
    },
    uncheckAll(state, action) {
      // console.log(state, action.payload)
      action.payload.forEach((id) => {
        state[id].isChecked = false
      })
    },
    deleteCheckedFromCart(state, action) {
      console.log(state, action)
    },
  },
})

export const {
  addCartItem,
  removeItemFromCart,
  deleteItemFromCart,
  changeIsChecked,
  checkAll,
  uncheckAll,
  deleteCheckedFromCart,
} = cartSlice.actions
export const getCartSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
