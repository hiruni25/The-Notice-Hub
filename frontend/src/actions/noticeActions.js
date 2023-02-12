import axios from "axios";

import {
  ALL_NOTICE_REQUEST,
  ALL_NOTICE_SUCCESS,
  ALL_NOTICE_FAIL,
  NOTICE_DETAILS_REQUEST,
  NOTICE_DETAILS_SUCCESS,
  NOTICE_DETAILS_FAIL,
  CLEAR_ERRORS,
  CREATE_NOTICE_REQUEST,
  CREATE_NOTICE_SUCCESS,
  CREATE_NOTICE_FAIL,
} from "../constants/noticeConstants";

export const createNotice = (title, content) => async (dispatch) => {
  console.log(title, content)
  try {
    dispatch({ type: CREATE_NOTICE_REQUEST });
    let token =   (localStorage.getItem("token"))

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    };

    const { data } = await axios.post("http://localhost:4000/api/v1/notice", {title, content} , config);

    dispatch({
      type: CREATE_NOTICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NOTICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getNotice =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_NOTICE_REQUEST });

      let link = `/api/v1/NOTICE?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/NOTICE?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_NOTICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_NOTICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getNoticeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NOTICE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: NOTICE_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: NOTICE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
