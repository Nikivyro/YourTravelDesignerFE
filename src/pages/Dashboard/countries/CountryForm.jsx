// CountryForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addCountry, updateCountry } from '../../../api/countryApi';

export default function CountryForm({ countryToEdit, onCountryAdded, onCountryUpdated }) {
  const [countryData, setCountryData] = useState({
    name: '',
  });

  useEffect(() => {
    if (countryToEdit) {
      setCountryData({
        name: countryToEdit.name || '',
      });
    }
  }, [countryToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCountryData({ ...countryData, [name]: value });
  };

  const handleSubmitCountry = async (e) => {
    e.preventDefault();

    try {
      if (countryToEdit) {
        // Modifica del paese esistente
        const updatedCountry = await updateCountry(countryToEdit._id, countryData);
        onCountryUpdated(updatedCountry);
      } else {
        // Aggiunta di un nuovo paese
        const newCountry = await addCountry(countryData);
        onCountryAdded(newCountry);
      }

      // Resetta i dati del form
      setCountryData({ name: '' });
    } catch (error) {
      console.error('Error submitting country form:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmitCountry}>
        <Form.Group className="mb-3" controlId="formBasicCountryName">
          <Form.Label>Nome Paese</Form.Label>
          <Form.Control type="text" name="name" value={countryData.name} onChange={handleInputChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          {countryToEdit ? 'Modifica Paese' : 'Aggiungi Paese'}
        </Button>
      </Form>
    </>
  );
}