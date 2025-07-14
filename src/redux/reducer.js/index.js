import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import buyTicket from './buyTicket'
import currentLogin from './currentLogin'

const ticketPersistConfig = {
  key: 'data',
  storage
}

const currentLoginPersistConfig = {
  key: 'currentLogin',
  storage
}

const reducer = combineReducers({
  data: persistReducer(ticketPersistConfig, buyTicket),
  currentLogin: persistReducer(currentLoginPersistConfig, currentLogin)
})

export default reducer