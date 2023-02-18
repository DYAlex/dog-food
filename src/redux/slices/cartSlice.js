import { createSlice } from '@reduxjs/toolkit'
import { getInitState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitState(),
  reducers: {
    addCartItem(state, action) {
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
      if (action.payload in state) {
        // console.log('Object found in cart', action.payload)
        state[action.payload].isChecked = !state[action.payload].isChecked
      }
    },
    checkAll(state) {
      // console.log('State in checkAll', JSON.parse(JSON.stringify(state)))
      Object.keys(state).map((key) => {
        state[key].isChecked = true
        return state[key].isChecked
      })
      // action.payload.forEach((id) => {
      //   state[id].isChecked = true
      // })
    },
    uncheckAll(state) {
      // console.log(state, action.payload)
      Object.keys(state).map((key) => {
        state[key].isChecked = false
        return state[key].isChecked
      })
      // action.payload.forEach((id) => {
      //   state[id].isChecked = false
      // })
    },
    deleteCheckedFromCart(state, action) {
      action.payload.forEach((id) => {
        delete state[id]
      })
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
