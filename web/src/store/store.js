import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

// 创建的reducer
import tokenReducer from './redux'


// combineReducers合并reducer
const reducers = combineReducers({
    token: tokenReducer
})

//  配置缓存
const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;