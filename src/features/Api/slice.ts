import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../Api/AuthApi'
import authSlice from '../Slice/AuthSlice'
import storage from 'redux-persist/lib/storage' 
import { persistReducer, persistStore } from 'redux-persist';

// configure the Redux store
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'isAuthenticated', 'user'], 
};


//persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

// const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
    reducer: {
        // Add the AuthApi reducer
        [AuthApi.reducerPath]: AuthApi.reducer,

        //add the auth slice reducer
        authSlice: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware),
})


//export the persisted store
export const persistor = persistStore(store)



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch