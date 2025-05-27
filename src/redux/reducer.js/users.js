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
        }
    }
})

export const { addUserAction } = users.actions
export default users.reducer