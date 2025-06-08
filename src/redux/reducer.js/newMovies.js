import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: []
}

const newMovies = createSlice({
  name: 'newMovies',
  initialState,
  reducers: {
    addMovieAction: function(state, action) {
        state.movies = {
          ...state.movies,
          ...action.payload
        }
    },
    removeDataAction: function() {
        return initialState
    }
  }
})

export const { addDataAction, removeDataAction } = newMovies.actions
export default newMovies.reducer