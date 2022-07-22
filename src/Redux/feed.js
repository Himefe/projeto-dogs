import { Slice } from "victory";
import { PHOTOS_GET } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";

const feedSlice = createAsyncSlice({
  name: "feed",
  initialState: {
    list: [],
    page: 1,
    infinite: true,
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload);
      state.infinite = true;
      if (action.payload.length <= 1) state.infinite = false;
    },
    addPage(state) {
      state.page++;
    },
    resetState(state) {
      state.infinite = true;
      state.page = 1;
      state.data = null;
      state.error = null;
      state.list = [];
      state.loading = false;
    },
  },
  fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user }),
});

export const fetchFeed = feedSlice.asyncAction;

export const { addPhotos, addPage, resetState } = feedSlice.actions;

export const loadPhotos =
  ({ total, user = 0 }) =>
  async (dispatch, getState) => {
    const { feed } = getState();
    const { payload } = await dispatch(
      fetchFeed({ page: feed.page, total, user })
    );

    dispatch(addPhotos(payload));
    dispatch(addPage());
  };

export default feedSlice.reducer;
