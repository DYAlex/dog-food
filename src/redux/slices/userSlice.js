import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setUserGroup(state, action) {
      console.log(state, action)
    },
    setUserName(state, action) {
      console.log(state, action)
    },
    setUserEmail(state, action) {
      console.log(state, action)
    },
    setUserToken(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload
      // console.log('This is state.token in userSlice setUserToken', state.token)
    },
  },
})

export const {
  setUserGroup, setUserName, setUserEmail, setUserToken,
} = userSlice.actions
export const getUserSelector = (state) => state.user
export const userReducer = userSlice.reducer