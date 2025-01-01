import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "song",
  initialState: {
    loading: true,
    songIndex: 0,
    pageNumber: 1,
    query:"latest",
    songs:[],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSongIndex: (state, action) => {
      state.songIndex = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { setLoading, setSongIndex ,setPageNumber,setQuery,setSongs} = songSlice.actions;

export default songSlice.reducer;