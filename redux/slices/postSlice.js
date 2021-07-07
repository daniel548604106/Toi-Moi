import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../lib/axiosConfig';
import { apiGetSavedPosts } from '../../api';
export const apiGetLikesList = createAsyncThunk(
  'post/getLikesList',
  async (id, thunkAPI) => {
    const response = await request.get(`/posts/like/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const apiGetCurrentPost = createAsyncThunk(
  'post/getCurrentPost',
  async (id, thunkAPI) => {
    const response = await request.get(`/posts/${id}`);
    console.log(response);
    return response.data;
  }
);
export const getSavedPosts = createAsyncThunk(
  'post/getSavedPost',
  async (id, thunkAPI) => {
    const response = await apiGetSavedPosts();
    console.log(response, 'saved');
    return response.data.posts;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLikesListOpen: false,
    likesList: [],
    savedPosts: [],
    currentPost: null,
    isPostInputBoxOpen: false,
    isViewPostModalOpen: false,
    imageToPost: ''
  },
  reducers: {
    setLikesListOpen: (state, { payload }) => {
      if (payload === false) {
        state.likesList = [];
      }
      state.isLikesListOpen = payload;
    },
    setPostInputBoxOpen: (state, { payload }) => {
      state.isPostInputBoxOpen = payload;
    },
    setImageToPost: (state, { payload }) => {
      state.imageToPost = payload;
    },
    setViewPostModalOpen: (state, { payload }) => {
      if (payload === false) {
        setImageToPost('');
      }
      state.isViewPostModalOpen = payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [apiGetLikesList.fulfilled]: (state, action) => {
      // Add likes to the state array
      console.log('extra', action.payload);
      state.likesList = action.payload;
    },
    [apiGetCurrentPost.fulfilled]: (state, action) => {
      state.currentPost = action.payload;
    },
    [getSavedPosts.fulfilled]: (state, action) => {
      state.savedPosts = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setLikesListOpen,
  setPostInputBoxOpen,
  setViewPostModalOpen,
  setImageToPost
} = postSlice.actions;

export default postSlice.reducer;
