import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../lib/axiosConfig';

export const apiGetLikesList = createAsyncThunk(
  'post/getLikesList',
  async (id, thunkAPI) => {
    const response = await request.get(`/posts/like/${id}`);
    console.log(response);
    return response.data;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLikesListOpen: false,
    likesList: []
  },
  reducers: {
    setLikesListOpen: (state, { payload }) => {
      if (payload === false) {
        state.likesList = [];
      }
      state.isLikesListOpen = payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [apiGetLikesList.fulfilled]: (state, action) => {
      // Add likes to the state array
      state.likesList = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLikesListOpen } = postSlice.actions;

export default postSlice.reducer;