import { configureStore } from '@reduxjs/toolkit';
import experienceSlice from './experienceSlice';
// import authSlice from './authSlice';
// import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    experiences: experienceSlice,
    // auth: authSlice,
    // user: userSlice
  },
});

export default store;
