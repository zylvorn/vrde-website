// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  // auth: authSlice.reducer,
  // firebaseReducer: firebaseSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production' ? { name: 'CKB' } : false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // because serializableCheck is false, please make sure you dont put non-serializable data in the store
      // non-serializable data is like function, promise, class instance, or other non-plain object
      // you can use async thunk for handle promise or class and dispatch it as serializable data
      serializableCheck: false,
    })
  },
})

type RootState = ReturnType<typeof rootReducer>
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, useAppSelector }
