import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
}

const buyTicket = createSlice({
    name: 'buyTicket',
    initialState,
    reducers: {
        addDataAction: function(state, action) {
            state.data = {
                ...state.data,
                ...action.payload
            }
        },
        removeDataAction: function() {
            return initialState
        }
    }
})

export const { addDataAction, removeDataAction } = buyTicket.actions
export default buyTicket.reducer