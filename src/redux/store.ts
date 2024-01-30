import {combineReducers, configureStore,} from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import achiveReducer from './features/achievements'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
        authReducer,
        achiveReducer
})
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({reducer: persistedReducer})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
