import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
    // return fetch(url)
    //   .then((resp) => resp.json())
    //   .catch((error) => console.log(error));
  }
);

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      const newCart = state.cartItems.filter((item) => item.id !== payload.id);
      state.cartItems = [...newCart];
    },
    increase: (state, { payload }) => {
      const { id } = payload;
      const item = state.cartItems.find((item) => item.id === id);
      item.amount += 1;
    },
    decrease: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload.id);
      if (item.amount <= 1) {
        const newCart = state.cartItems.filter(
          (item) => item.id !== payload.id
        );
        state.cartItems = [...newCart];
      } else {
        item.amount -= 1;
      }
    },
    calculate: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * 100 * item.amount;
      });
      state.amount = amount;
      state.total = total / 100;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      });
  },
});

export const { clearCart, increase, removeItem, decrease, calculate } =
  cartSlice.actions;

export default cartSlice.reducer;
