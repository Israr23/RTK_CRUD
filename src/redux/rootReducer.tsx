import { combineReducers } from 'redux'
import { bookApi } from './book/bookSlice'

export const rootReducer = combineReducers({
  [bookApi.reducerPath]: bookApi.reducer,
})
