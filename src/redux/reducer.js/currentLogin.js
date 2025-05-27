import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
}

const currentLogin = createSlice({
    name: 'currentLogin',
    initialState,
    reducers: {
        currentLoginAction: function(state, action) {
            state.data = {...action.payload}
        },
        removeLoginAction: function(state) {
            state.data = {}
        }
    }
})

export const { currentLoginAction, removeLoginAction } = currentLogin.actions
export default currentLogin.reducer