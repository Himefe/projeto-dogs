import { createSlice } from "@reduxjs/toolkit";

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStarted(state) {
        state.loading = true;
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      resetState(state) {
        state.loading = false;
        state.data = null;
        state.error = false;
      },
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());

      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) throw json.message;
      return await dispatch(fetchSuccess(json));
    } catch (error) {
      return await dispatch(fetchError(error));
    }
  };

  return { ...slice, asyncAction };
};

export default createAsyncSlice;
