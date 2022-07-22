import { PHOTOS_GET, PHOTO_GET } from "../api";

const FETCH_PHOTO_STARTED = "photo/fetchStarted";
const FETCH_PHOTO_SUCCESS = "photo/fetchSuccess";
const FETCH_PHOTO_ERROR = "photo/fetchError";
const INCREMENT_PAGE = "photo/incrementPage";

const fetchPhotoStarted = () => ({
  type: FETCH_PHOTO_STARTED,
});

const fetchPhotoSuccess = (payload) => ({
  type: FETCH_PHOTO_SUCCESS,
  payload,
});

const fetchPhotoError = (payload) => ({
  type: FETCH_PHOTO_ERROR,
  payload,
});

const incrementPage = () => ({
  type: INCREMENT_PAGE,
});

const initialState = {
  loading: false,
  data: null,
  error: null,
  page: 1,
  total: 6,
  infinite: true,
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTO_STARTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case INCREMENT_PAGE:
      return {
        ...state,
        page: state.page++,
      };

    default:
      return state;
  }
};

export const fetchPhotoId = (id) => async (dispatch) => {
  try {
    await dispatch(fetchPhotoStarted());
    const { url, options } = PHOTO_GET(id);
    let response = await fetch(url, options);
    let json = await response.json();

    if (!response.ok) throw new Error(json.message);
    await dispatch(fetchPhotoSuccess(json));
  } catch (error) {
    dispatch(fetchPhotoError(error));
  }
};

export const fetchPhotos = () => async (dispatch, getState) => {
  const state = getState().photoReducer;
  const stateUser = getState().user;

  try {
    dispatch(fetchPhotoStarted());
    const { url, options } = PHOTOS_GET({
      page: state.page,
      total: state.total,
      user: stateUser.data?.id,
    });
    let response = await fetch(url, options);
    let json = await response.json();

    if (!response.ok) throw new Error(json);
    await dispatch(fetchPhotoSuccess(json));
    dispatch(incrementPage());
  } catch (error) {
    dispatch(fetchPhotoError(error));
  }
};
