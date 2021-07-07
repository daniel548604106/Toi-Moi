import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetMyInfo, apiGetFriendList } from '../../api/index';
export const getMyInfo = createAsyncThunk(
  'get/getMyInfo',
  async (id, thunkAPI) => {
    const response = await apiGetMyInfo();
    console.log(response);
    return response.data;
  }
);
export const getFriendList = createAsyncThunk(
  'get/getFriendList',
  async (id, thunkAPI) => {
    const response = await apiGetFriendList();
    console.log(response);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isUserLoggedIn: false,
    userInfo: {},
    notifications: [],
    friendsList: [],
    isEditProfileImageOpen: false,
    profileImageToUpdate: ''
  },

  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setUserLogin: (state, { payload }) => {
      (state.isUserLoggedIn = true), (state.userInfo = payload);
    },
    setUserLogout: (state, { payload }) => {
      (state.isUserLoggedIn = false), (state.userInfo = {});
    },
    setEditProfileImageOpen: (state, { payload }) => {
      state.isEditProfileImageOpen = payload;
    },
    setProfileImageToUpdate: (state, { payload }) => {
      if (payload === false) {
        state.profileImageToUpdate = '';
      }
      state.profileImageToUpdate = payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getMyInfo.fulfilled]: (state, action) => {
      // Add likes to the state array
      state.userInfo = action.payload;
    },
    [getFriendList.fulfilled]: (state, action) => {
      // Add likes to the state array
      state.userInfo = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setUserLogin,
  setUserLogout,
  setEditProfileImageOpen,
  setProfileImageToUpdate
} = userSlice.actions;

export default userSlice.reducer;
