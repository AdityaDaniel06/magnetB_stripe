import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    addItems(state, action) {
      state.cart.push(action.payload);
      //   console.log(state.cart);
    },
    deleteItem(state, action) {
      // payload = id
      console.log(action.payload);
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      //   item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      //   item.totalPrice = item.quantity * item.price;
      if (item.quantity === 0) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItems,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalQuantity = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.quantity, 0);
};

export const getTotalCartPrice = (state) => {
  return state.cart.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const getCurrentQuantityById = (id) => (state) => {
  return state.cart.cart.find((item) => item.id === id)?.quantity;
};

export const getCart = (state) => state.cart.cart;
