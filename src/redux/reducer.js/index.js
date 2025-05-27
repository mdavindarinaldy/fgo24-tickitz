import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import buyTicket from './buyTicket'

const persistConfig = {
    key: 'data',
    storage
}

const reducer = combineReducers({
    data: persistReducer(persistConfig, buyTicket),
})

export default reducer