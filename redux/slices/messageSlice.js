import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: []
  },
  reducers: {
    setMessages: (state, payload) => {
      state.messages = payload;
    }
  }
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
