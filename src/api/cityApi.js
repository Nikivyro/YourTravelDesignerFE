import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_ENDPOINT;

export const fetchCities = async () => {
  try {
    const response = await axios.get(`${API_URL}/cities`);
    return response.data.cities;
  } catch (error) {
    console.error('Error fetching cities:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchCity = async (cityName) => {
  try {
    const response = await axios.get(`${API_URL}/cities/${cityName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error.response?.data || error.message);
    throw error;
  }
};

export const addCity = async (cityData) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append('cover', cityData.cover);

    const imageResponse = await axios.post(`${API_URL}/cities/cloudUpload`, imageFormData);

    const cityResponse = await axios.post(`${API_URL}/city/create`, {
      name: cityData.name,
      country: cityData.country,
      cover: imageResponse.data.cover,
    });

    return cityResponse.data.city;
  } catch (error) {
    console.error('Error adding city:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCity = async (cityId, cityData) => {
  try {
    if (cityData.cover) {
      const imageFormData = new FormData();
      imageFormData.append('cover', cityData.cover);

      const imageResponse = await axios.post(`${API_URL}/cities/cloudUpload`, imageFormData);
      cityData.cover = imageResponse.data.cover;
    }

    const updatedCityResponse = await axios.patch(`${API_URL}/city/update/${cityId}`, cityData);
    return updatedCityResponse.data.updatedCity;
  } catch (error) {
    console.error('Error updating city:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteCity = async (cityId) => {
  try {
    const response = await axios.delete(`${API_URL}/city/delete/${cityId}`);
    return response.data.message;
  } catch (error) {
    console.error('Error deleting city:', error.response?.data || error.message);
    throw error;
  }
};
