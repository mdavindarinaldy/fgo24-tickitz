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
        }
    }
})

export const { addDataAction } = buyTicket.actions
export default buyTicket.reducer