import { configureStore } from '@reduxjs/toolkit'
import { bookApi } from './book/bookSlice'
import { rootReducer } from './rootReducer'

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
})
