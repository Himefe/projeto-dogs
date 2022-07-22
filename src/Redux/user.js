import { GET_USER } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";
import { fetchToken, resetTokenState } from "./token";

const userSlice = createAsyncSlice({
  name: "user",
  fetchConfig: (token) => GET_USER(token),
  reducers: {
    resetUserState(state) {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const fetchUser = userSlice.asyncAction;
export const { resetUserState } = userSlice.actions;

export const userLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user));

  if (payload.token) await dispatch(fetchUser(payload.token));
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState().token;

  if (state.data?.token) {
    return await dispatch(fetchUser(state.data?.token));
  }
};

export const userLoggout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(resetUserState());
  dispatch(resetTokenState());
};

export default userSlice.reducer;
