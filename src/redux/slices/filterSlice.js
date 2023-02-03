import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const filterSlice = createSlice({
  name: 'filter',
  initialState: initState.filter,
  reducers: {},
})

// export const {
//   setUserGroup, setUserName, setUserEmail, setUserToken,
// } = filterSlice.actions
export const getFilterSelector = (state) => state.filter
export const filterReducer = filterSlice.reducer
