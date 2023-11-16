import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToken} from './authSlice';

export const login = createAsyncThunk('auth/login', async (userData, { dispatch }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/user/login`, userData);

    // Salva il token nello stato di Redux
    dispatch(setToken(response.data.token));

    // Salva il token nel localStorage
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error('Errore durante il login:', error);
    throw error;
  }
});