/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base_url } from "../../utils/config";
import axios from "axios";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await axios.post(`${base_url}/category-add`, formData, config);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_category = createAsyncThunk(
  "category/get_category",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().auth
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const { data } = await axios.get(
        `${base_url}/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    category: [],
    totalCategory: 0,
  },
  reducers: {
    messageClear: (initialState, _) => {
      initialState.successMessage = "";
      initialState.errorMessage = "";
    },
  },
  extraReducers: {
    [categoryAdd.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [categoryAdd.rejected]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = "";
      state.errorMessage = payload.error;
    },
    [categoryAdd.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = "";
      state.successMessage = payload.message;
      state.category = [...state.category, payload.category];
    },
    [get_category.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = "";
      state.successMessage = payload.message;
      state.totalCategory = payload.totalCategory;
      state.category = payload.categorys;
    },
  },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
