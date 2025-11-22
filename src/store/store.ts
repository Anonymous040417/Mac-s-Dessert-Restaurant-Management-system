import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../features/api/api/AuthApi'
import authSlice from '../features/slice/AuthSlice'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { menuItemApi } from '../features/api/api/MenuItemApi';
import { orderApi } from '../features/api/api/OrderApi';
import { dashboardDataApi } from '../features/api/api/DataboardDataApi';
import { userApi } from '../features/api//api/UserApi';

// configure the Redux store
const authPersistConfig = {
    key: 'auth',
    storage,
    version: 1,
    whitelist: ['token', 'isAuthenticated', 'user'], // only persist these keys
};

//Create the persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
    reducer: {
        // Add the AuthApi reducer
        [AuthApi.reducerPath]: AuthApi.reducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [dashboardDataApi.reducerPath]: dashboardDataApi.reducer,
        [userApi.reducerPath]: userApi.reducer,

        //add the auth slice reducer
        authSlice: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(AuthApi.middleware, menuItemApi.middleware, orderApi.middleware, dashboardDataApi.middleware, userApi.middleware),
})

//export the persisted store
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch