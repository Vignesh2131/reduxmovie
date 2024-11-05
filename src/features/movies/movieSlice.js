import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies'
  , async (term) => {
    const response = await axios.get(`http://www.omdbapi.com/?&apikey=8f88a31c&s=${term}&type=movie`);
    return response.data
})

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?&apikey=8f88a31c&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncDetails = createAsyncThunk(
  "movies/fetchAsyncDetails",
  async (id) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?&apikey=8f88a31c&i=${id}&plot=full`
    );
    return response.data;
  }
);

const initialState = {
    movies: {},
    shows: {},
    selectedDetails:{},
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
      removeSelectedDetails: (state) => {
        state.selectedDetails = {};
      },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncMovies.pending, () => {
          console.log("pending");
        }),
          builder.addCase(fetchAsyncMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
          }),
          builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
            state.shows = action.payload;
          }),
          builder.addCase(fetchAsyncDetails.fulfilled, (state, action) => {
             return {...state,selectedDetails:action.payload}
          });
            
    }
});

export const { removeSelectedDetails } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedDetails = (state) => state.movies.selectedDetails
export default movieSlice.reducer