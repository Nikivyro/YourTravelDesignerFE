import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_ENDPOINT;

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data.countries;
  } catch (error) {
    console.error('Error fetching countries:', error.response?.data || error.message);
    throw error;
  }
};

export const addCountry = async (countryData) => {
  try {
    const countryResponse = await axios.post(`${API_URL}/country/create`, {
      name: countryData.name,
    });

    return countryResponse.data.country;
  } catch (error) {
    console.error('Error adding country:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCountry = async (countryId, countryData) => {
  try {
    const updatedCountryResponse = await axios.patch(`${API_URL}/country/update/${countryId}`, countryData);
    return updatedCountryResponse.data.updatedCountry;
  } catch (error) {
    console.error('Error updating country:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteCountry = async (countryId) => {
  try {
    const response = await axios.delete(`${API_URL}/country/delete/${countryId}`);
    return response.data.message;
  } catch (error) {
    console.error('Error deleting country:', error.response?.data || error.message);
    throw error;
  }
};
