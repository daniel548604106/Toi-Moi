import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    isListOpen: true,
    openChatBoxList: []
  },
  reducers: {
    setMessages: (state, payload) => {
      state.messages = payload;
    },
    toggleListOpen: (state) => {
      state.isListOpen = !state.isListOpen;
    },
    addToChatBoxList: (state, { payload }) => {
      if (
        !state.openChatBoxList.map((list) => list._id).includes(payload._id)
      ) {
        state.openChatBoxList = [...state.openChatBoxList, payload];
      }
    },
    removeFromChatBoxList: (state, { payload }) => {
      state.openChatBoxList = state.openChatBoxList.filter(
        (list) => list._id !== payload._id
      );
    }
  }
});

export const {
  setMessages,
  toggleListOpen,
  addToChatBoxList,
  removeFromChatBoxList
} = messageSlice.actions;

export default messageSlice.reducer;
