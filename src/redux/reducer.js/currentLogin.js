import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    profile: {
      email: "",
      name: "",
      role: "",
      phoneNumber: "",
      profilePicture: "",
    },
}

const currentLogin = createSlice({
    name: 'currentLogin',
    initialState,
    reducers: {
        currentLoginAction: function(state, action) {
            const {token, profile} = action.payload
            state.token = token
            state.profile = profile
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