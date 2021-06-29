import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isSearchBarOpen: false,
    isLanguageOpen: false,
    isCreateRoomOpen: false
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    toggleSearchBar: (state) => {
      state.isSearchBarOpen = !state.isSearchBarOpen;
    },
    toggleLanguageOpen: (state) => {
      state.isLanguageOpen = !state.isLanguageOpen;
    },
    toggleCreateRoomOpen: (state) => {
      state.isCreateRoomOpen = !state.isCreateRoomOpen;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  toggleSearchBar,
  toggleCreateRoomOpen,
  setLikesListOpen,
  toggleLanguageOpen
} = globalSlice.actions;

export default globalSlice.reducer;
