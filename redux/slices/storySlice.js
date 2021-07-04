import { createSlice } from '@reduxjs/toolkit';

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    isUploadStoryModalOpen: false
  },
  reducers: {
    toggleUploadStoryModal: (state) => {
      state.isUploadStoryModalOpen = !state.isUploadStoryModalOpen;
    }
  }
});

export const { toggleUploadStoryModal } = storySlice.actions;

export default storySlice.reducer;
