import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../features/Api/AuthApi'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from '../features/Slice/AuthSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated','token', 'user'] // in the browser only thses will be kept track of in the local storage
}

// const cartPersitedConfig = {
//   key: "cart",
//   storage,
//   whitelist: ['itemsByUser']
// }

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice)


export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]:AuthApi.reducer,

    //add the auth slice router(one that is persisted)
    authSlice:persistedAuthReducer,
    //add cartslice to handle cart logic
   

  },

   middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware)
})
//export the persrsted store
export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch