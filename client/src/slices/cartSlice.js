import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart') 
  ? JSON.parse(localStorage.getItem('cart')) 
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Stripe' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id && x.size === item.size);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.size === existItem.size ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload.id || x.size !== action.payload.size);
      updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    },
  },
});

const updateCart = (state) => {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  state.itemsPrice = itemsPrice.toFixed(2);

  // Calculate shipping price (Free over $100, else $10)
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = shippingPrice.toFixed(2);

  // Calculate tax price (15% tax)
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = taxPrice.toFixed(2);

  // Calculate total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = totalPrice.toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
};

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
