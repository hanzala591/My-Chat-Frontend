import { createSlice } from "@reduxjs/toolkit";
export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    selectedUser: JSON.parse(localStorage.getItem("selected-user")) || null,
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
    addMeesage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});
export const { setMessages, getMessages, setSelectedUser, addMeesage } =
  messageSlice.actions;
export default messageSlice.reducer;
