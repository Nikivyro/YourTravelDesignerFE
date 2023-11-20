import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

// Azione di inizializzazione dello stato dell'utente
export const initializeAuth = createAsyncThunk('auth/initializeAuth', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));

    // Verifica se c'è un token nel localStorage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // Effettua una richiesta per ottenere le informazioni dell'utente utilizzando il token
      const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/user/profile`, {
        headers: {
          Authorization: storedToken,
        },
      });

      // Salva le informazioni dell'utente nello stato di Redux
      dispatch(setUser(response.data.user));

      // Restituisci il token e le informazioni dell'utente per l'inizializzazione
      return { token: storedToken, user: response.data.user };
    } else {
      // Se non c'è un token nel localStorage, restituisci solo le informazioni dell'utente vuote
      return { token: null, user: null };
    }
  } catch (error) {
    console.error('Errore durante l\'inizializzazione dello stato dell\'utente:', error);
    throw error;
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, { dispatch, getState }) => {
  try {
    dispatch(setLoading(true));

    const { token } = getState().auth;

    // Effettua una richiesta PATCH per aggiornare il profilo dell'utente
    const response = await axios.patch(`${process.env.REACT_APP_URL_ENDPOINT}/user/profile/update`, userData, {
      headers: {
        Authorization: token,
      },
    });

    // Aggiorna le informazioni dell'utente nello stato di Redux
    dispatch(setUser(response.data.result));

    // Restituisci le nuove informazioni dell'utente per l'aggiornamento
    return response.data.result;
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del profilo dell\'utente:', error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(clearAuth());
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true
      state.isLoading = false;
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logoutUser: logoutUser,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.token;
        state.isLoading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setToken, setUser, clearAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;