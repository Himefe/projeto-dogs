import { USER_PHOTO_POST } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";

const photoSlice = createAsyncSlice({
  name: "photoPost",
  fetchConfig: ({ formData, token }) => USER_PHOTO_POST({ formData, token }),
  reducers: {
    resetState(state) {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const { resetState } = photoSlice.actions;

export const photoPost = photoSlice.asyncAction;

export default photoSlice.reducer;
