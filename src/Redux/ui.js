import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modal: false,
  },
  reducers: {
    toggleModal(state) {
      state.modal = !state.modal;
    },
  },
});

export const { toggleModal } = uiSlice.actions;

export default uiSlice.reducer;
