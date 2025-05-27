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
        }
    }
})

export const { currentLoginAction } = currentLogin.actions
export default currentLogin.reducer