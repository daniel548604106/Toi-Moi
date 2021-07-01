import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    isListOpen: true
  },
  reducers: {
    setMessages: (state, payload) => {
      state.messages = payload;
    },
    toggleListOpen: (state) => {
      state.isListOpen = !state.isListOpen;
    }
  }
});

export const { setMessages, toggleListOpen } = messageSlice.actions;

export default messageSlice.reducer;
