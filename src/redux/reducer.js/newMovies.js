import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: []
}

const newMovies = createSlice({
  name: 'newMovies',
  initialState,
  reducers: {
    addMovieAction: function(state, action) {
        state.movies.push({...action.payload})
    },
    removeMovieAction: function() {
        return initialState
    }
  }
})

export const { addMovieAction, removeMovieAction } = newMovies.actions
export default newMovies.reducer