import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExperiences = createAsyncThunk('experiences/fetchExperiences', async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences`);
    return response.data.experiences;
  } catch (error) {
    throw error;
  }
});

export const createExperience = createAsyncThunk('experiences/createExperience', async (experienceData) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append('cover', experienceData.cover);

    // Effettua l'upload dell'immagine
    const imageResponse = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/cloudUpload`, imageFormData);

    // Ottieni l'URL dell'immagine caricata
    const coverURL = imageResponse.data.cover;

    // Crea i dati dell'esperienza con l'URL dell'immagine
    const experienceToCreate = { ...experienceData, cover: coverURL };

    const response = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/create`, experienceToCreate, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateExperience = createAsyncThunk('experiences/updateExperience', async ({ experienceId, dataToUpdate }) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_URL_ENDPOINT}/experiences/edit/${experienceId}`,
      dataToUpdate,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteExperience = createAsyncThunk('experiences/deleteExperience', async (experienceId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/delete/${experienceId}`);
    return experienceId;
  } catch (error) {
    throw error;
  }
});

export const uploadCover = createAsyncThunk('experiences/uploadCover', async (file) => {
  try {
    const formData = new FormData();
    formData.append('cover', file);

    const response = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/cloudUpload`, formData);
    return response.data.cover;
  } catch (error) {
    throw error;
  }
});

export const fetchExperienceById = createAsyncThunk('experiences/fetchExperienceById', async (experienceId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/${experienceId}`);
    return response.data.experience;
  } catch (error) {
    throw error;
  }
});

export const fetchExperiencesByType = createAsyncThunk('experiences/fetchExperiencesByType', async (type) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/type/${type}`);
    return response.data.experiences;
  } catch (error) {
    throw error;
  }
});

export const fetchExperiencesByCategory = createAsyncThunk('experiences/fetchExperiencesByCategory', async (category) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/category/${category}`);
    return response.data.experiences;
  } catch (error) {
    throw error;
  }
});

export const fetchExperiencesByCity = createAsyncThunk('experiences/fetchExperiencesByCity', async (cityName) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences?city=${cityName}`);
    return response.data.experiences;
  } catch (error) {
    throw error;
  }
});

export const fetchExperiencesByLocation = createAsyncThunk('experiences/fetchExperiencesByLocation', async (cityName) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/city/${cityName}`);
    return response.data.experiences;
  } catch (error) {
    throw error;
  }
});

export const fetchRelatedExperienceById = createAsyncThunk('experiences/fetchRelatedExperienceById', async ({ cityName, experienceId }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/city/${cityName}/related/${experienceId}`);
    return response.data.experiences;
  } catch (error) {
    throw error;
  }
});

export const fetchExperienceByUser = createAsyncThunk('experiences/fetchExperienceByUser', async ({ userId }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/user/${userId}`);
    return response.data.experiences;
  } catch (error) {
    throw error;
  }
});



const experienceSlice = createSlice({
  name: 'experiences',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateExperience.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.data.findIndex((experience) => experience._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.data = state.data.filter((experience) => experience._id !== action.payload);
      })
      .addCase(uploadCover.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadCover.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coverURL = action.payload;
      })
      .addCase(uploadCover.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExperiencesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiencesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExperiencesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExperiencesByType.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiencesByType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExperiencesByType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExperiencesByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiencesByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExperiencesByCity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExperienceById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperienceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [action.payload];
      })
      .addCase(fetchExperienceById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExperiencesByLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiencesByLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExperiencesByLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRelatedExperienceById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRelatedExperienceById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRelatedExperienceById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExperienceByUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperienceByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExperienceByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const selectCoverURL = (state) => state.experiences.coverURL;
export default experienceSlice.reducer;
