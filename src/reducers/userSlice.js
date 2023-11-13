import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  try {
    const token = localStorage.getItem('token'); // Ottieni il token dal localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Imposta l'header "Authorization" con il token
      },
    };

    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/user/profile`, config);

    if (response.status === 200) {
      const userData = response.data;
      return userData;
    } else {
      throw response.data; // Lanciare un'eccezione
    }
  } catch (error) {
    throw error; // Lanciare un'eccezione
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
