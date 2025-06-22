import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: 1,
    name: 'Fiddle Leaf Fig',
    price: 25,
    image: process.env.PUBLIC_URL + '/assets/plant1.png',
    category: 'Large Plants',
  },
  {
    id: 2,
    name: 'Snake Plant',
    price: 18,
    image: process.env.PUBLIC_URL + '/assets/plant2.png',
    category: 'Easy Care',
  },
  {
    id: 3,
    name: 'Pothos',
    price: 15,
    image: process.env.PUBLIC_URL + '/assets/plant3.png',
    category: 'Vines',
  },
  {
    id: 4,
    name: 'Monstera',
    price: 30,
    image: process.env.PUBLIC_URL + '/assets/plant4.png',
    category: 'Large Plants',
  },
  {
    id: 5,
    name: 'ZZ Plant',
    price: 22,
    image: process.env.PUBLIC_URL + '/assets/plant5.png',
    category: 'Easy Care',
  },
  {
    id: 6,
    name: 'String of Pearls',
    price: 20,
    image: process.env.PUBLIC_URL + '/assets/plant6.png',
    category: 'Vines',
  },
];

const loadCart = () => {
  const stored = localStorage.getItem('cartItems');
  return stored ? JSON.parse(stored) : [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    products: initialProducts,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    updateCartItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCartItem, removeCartItem, clearCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

store.subscribe(() => {
  localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.items));
});

export default store; 