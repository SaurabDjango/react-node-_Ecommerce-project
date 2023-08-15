import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  cartItemCount: localStorage.getItem('cartItemCount') ? parseInt(localStorage.getItem('cartItemCount')) : 0,
  totalAmount: localStorage.getItem('totalAmount') ? parseFloat(localStorage.getItem('totalAmount')) : 0,
  user: []

};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.cartItemCount += 1;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setCart(state, action) {
      state.cart = action.payload;
      state.cartItemCount = action.payload.length;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeCart: (state, action) => {
      const productId = action.payload;
      const updatedCart = state.cart.filter((item) => item._id !== productId);
      state.cart = updatedCart;
      console.log(state.cart = updatedCart);
      state.cartItemCount = updatedCart.length;
    },
    
    incrementQuantity(state, action){
      const { id, quantity } = action.payload;
      const cartItem = state.cart.find((item)=> item._id === id)      
      if(cartItem) {
        cartItem.quantity += quantity;
        state.cartItemCount += quantity;
        console.log(cartItem.quantity += quantity);
      }
      console.log(cartItem);
    },
    
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    clearCart:(state,action) => {
      state.cart = [];
      state.cartItemCount = 0;
      state.totalAmount = 0;
    },
    userData:(state,action)=> {
      state.user = action.payload;
      console.log("data from cartslice",state.user = action.payload)
    },
  },
});

export const { addToCart, setCart, removeCart, incrementQuantity,setTotalAmount,clearCart,userData } = cartSlice.actions;

export default cartSlice.reducer;