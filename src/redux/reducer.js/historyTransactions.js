import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
}

const historyTransaction = createSlice({
    name: 'historyTransaction',
    initialState,
    reducers: {
        addHistoryAction: function(state, action) {
            state.data = {...action.payload}
        }
    }
})

export const { addHistoryAction } = historyTransaction.actions
export default historyTransaction.reducer