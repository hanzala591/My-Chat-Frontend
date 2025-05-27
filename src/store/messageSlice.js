import { createSlice } from "@reduxjs/toolkit";
export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    selectedUser: null,
  },
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { setMessages, getMessages, setSelectedUser } =
  messageSlice.actions;
export default messageSlice.reducer;
