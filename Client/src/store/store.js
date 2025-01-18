// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './TokenSlice.js';

const store = configureStore({
  reducer: {
    auth: tokenReducer,
  },
});

export default store;
