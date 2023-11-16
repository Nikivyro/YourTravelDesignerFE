import { configureStore } from '@reduxjs/toolkit';
import experienceSlice from './experienceSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    experiences: experienceSlice,
    auth: authSlice,
  },
});

export default store;
