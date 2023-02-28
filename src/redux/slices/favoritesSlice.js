import { createSlice } from '@reduxjs/toolkit'
import { getInitState } from '../initState'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: getInitState(),
  reducers: {
    addToFavorites(state, action) {
      console.log('addToFavorites reducer from favoritesSlice', { action })
      if (!state[action.payload]) {
        const newItem = {
          [action.payload]: {
            isFavorite: true,
          },
        }
        Object.assign(state, newItem)
        // console.log(state)
      }
    },
    removeFromFavorites(state, action) {
      console.log('removeFromFavorites reducer from favoritesSlice', { action })
      if (action.payload in state) {
        delete state[action.payload]
      }
    },
  },
})

export const {
  addToFavorites,
  removeFromFavorites,
} = favoritesSlice.actions
export const getFavoritesSelector = (state) => state.favorites
export const favoritesReducer = favoritesSlice.reducer
