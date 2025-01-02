import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "song",
  initialState: {
    loading: true,
    songIndex: null,
    pageNumber: 1,
    query:"hindi",
    songs:[],
    src:"",
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
      state.songIndex = 0;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.songIndex = 0;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setSrc:(state,action) =>{
      state.src = action.payload
    }
  },
});

export const { setLoading, setSongIndex ,setPageNumber,setQuery,setSongs,setSrc} = songSlice.actions;

export default songSlice.reducer;
