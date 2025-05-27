import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUserAction: function(state, action) {
            const id = Math.random().toString(36).substring(2,10);
            state.data.push({
                ...action.payload,
                id: id
            })
            return state
        },
        editUserAction: function(state, action) {
            const {currentLogin, sanitizedValue} = action.payload
            const found = state.data.findIndex(user => user.id === currentLogin.id)
            const newValue = {
                ...currentLogin,
                ...sanitizedValue
            }
            state.data[found] = newValue
        }
    }
})

export const { addUserAction, editUserAction } = users.actions
export default users.reducer