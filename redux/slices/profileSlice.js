import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetProfile } from '../../api';
export const getProfileData = createAsyncThunk(
  'post/getProfile',
  async (username, thunkAPI) => {
    const response = await apiGetProfile(username);
    console.log(response, 'from redux');
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: 'post',
  initialState: {
    profileData: null,
    isEditSummaryModalOpen: false,
    summaryData: null
  },
  reducers: {
    setSummaryModalShow: (state, { payload }) => {
      state.isEditSummaryModalOpen = payload;
    },
    setProfileData: (state, { payload }) => {
      state.profileData = payload;
    },
    setSummaryData: (state, { payload }) => {
      state.summaryData = payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getProfileData.fulfilled]: (state, { payload }) => {
      // Add likes to the state array
      console.log('dispatch from redux', payload);
      state.profileData = payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSummaryModalShow, setProfileData, setSummaryData } =
  profileSlice.actions;

export default profileSlice.reducer;
