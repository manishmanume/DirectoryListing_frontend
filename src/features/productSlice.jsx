import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get('http://localhost:5000/api/combinations');
  return response.data.combinations;
});

export const updateProductDetails = createAsyncThunk(
  'products/updateProductDetails',
  async ({ id, data }) => {
    const response = await axios.put(`http://localhost:5000/api/update/${id}`, data);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      return [...state, action.payload]; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateProductDetails.fulfilled, (state, action) => {
        const index = state.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state[index] = { ...state[index], ...action.payload };
        }
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
