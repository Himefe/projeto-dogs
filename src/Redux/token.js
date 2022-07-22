import { TOKEN_POST } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";
import getLocalStorage from "./helper/getLocalStorage";

const getTokenLocal = getLocalStorage("token", null);

const tokenSlice = createAsyncSlice({
  name: "token",
  initialState: {
    data: {
      token: getTokenLocal ? JSON.parse(getTokenLocal) : null,
    },
  },
  fetchConfig: (user) => TOKEN_POST(user),
  reducers: {
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: "token",
              value: payload.token,
            },
          },
        };
      },
    },
    resetTokenState(state) {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const fetchToken = tokenSlice.asyncAction;
export const { resetTokenState } = tokenSlice.actions;

export default tokenSlice.reducer;
