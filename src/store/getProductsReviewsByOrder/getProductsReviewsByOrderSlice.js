import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentOrderId: null,
};

export const getProductsReviewsByOrder = createAsyncThunk(
  "user/getProductsReviewsByOrder",
  async ({ order_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/user-orders/${order_id}/reviews/products`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getProductsReviewsByOrderSlice = createSlice({
  name: "productsReviewsByOrder",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsReviewsByOrder.pending, (state, action) => {
        state.currentOrderId = action.meta.arg?.order_id;
        state.status = "loading";
      })
      .addCase(getProductsReviewsByOrder.fulfilled, (state, action) => {
        const productsData = [];
        const checkIfProductExists = (productVariantId) =>
          productsData.find(
            (product) => product?.variant_id === productVariantId
          );

        action.payload?.forEach((product) => {
          if (!checkIfProductExists(product?.variant_id)) {
            productsData.push(product);
          }
        });

        state.status = "succeeded";
        state.data = productsData;
        state.error = null;
      })
      .addCase(getProductsReviewsByOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = getProductsReviewsByOrderSlice.actions;

export default getProductsReviewsByOrderSlice.reducer;
