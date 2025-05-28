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
            return state
        },
        removeLoginAction: function() {
            // state.data = {}
            return initialState
        }
    }
})

export const { currentLoginAction, removeLoginAction } = currentLogin.actions
export default currentLogin.reducer