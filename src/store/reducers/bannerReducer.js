/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";

export const add_banner = createAsyncThunk(
  "banner/add_banner",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("image", image);
      const { token } = getState().auth
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.post(`${base_url}/banner/add`, info, config);

      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const update_banner = createAsyncThunk(
  "banner/update_banner",
  async ({ bannerId, info }, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("image", image);
      const { token } = getState().auth
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.put(`${base_url}/banner/update/${bannerId}`, info, config);

      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_banner = createAsyncThunk(
  "banner/get_banner",
  async (productId, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("image", image);
      const { token } = getState().auth
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`${base_url}/banner/get/${productId}`, config);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bannerReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    banners: [],
    banner: {},
  },
  reducers: {
    messageClear: (initialState, _) => {
      initialState.successMessage = "";
      initialState.errorMessage = "";
    },
  },
  extraReducers: {
    [add_banner.pending]: (state, _) => {
      state.loader = true;
    },
    [add_banner.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMassage = payload.message;
    },
    [add_banner.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.banner = payload.banner;
    },
    [get_banner.fulfilled]: (state, { payload }) => {
      state.banner = payload.banner;
    },
    [update_banner.pending]: (state, _) => {
      state.loader = true;
    },
    [update_banner.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMassage = payload.message;
    },
    [update_banner.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.banner = payload.banner;
    },
  },
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
