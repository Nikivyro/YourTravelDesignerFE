import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Importa useDispatch da react-redux

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const dispatch = useDispatch(); // Ottieni la funzione dispatch
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/login`, credentials);

    if (response.status === 200) {
      const userData = response.data;
      const token = response.data.token; // Estrai il token dalla risposta
      // Salva il token nello stato dell'autenticazione
      dispatch(setAuthToken(token));
      // Imposta l'autenticazione come riuscita
      dispatch(setAuthStatus(true));
      return userData;
    } else {
      throw response.data; // Lanciare un'eccezione
    }
  } catch (error) {
    throw error; // Lanciare un'eccezione
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: localStorage.getItem('token') || null, // Inizializza il token dal localStorage
  },
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
      // Imposta il token nel localStorage
      localStorage.setItem('token', action.payload);
    },
    clearAuthData: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      // Rimuovi il token dal localStorage
      localStorage.removeItem('token');
    },
  },
});

export const { setAuthStatus, setAuthToken, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
