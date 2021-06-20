import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetProfile } from '../../api';
export const getProfileData = createAsyncThunk(
  'post/getProfile',
  async (username, thunkAPI) => {
    const response = await apiGetProfile(username);
    console.log(response);
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: 'post',
  initialState: {
    profileData: null
  },
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getProfileData.fulfilled]: (state, action) => {
      // Add likes to the state array
      state.profileData = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {} = profileSlice.actions;

export default profileSlice.reducer;
