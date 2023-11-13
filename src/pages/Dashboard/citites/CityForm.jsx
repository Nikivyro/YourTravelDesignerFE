import React, { useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { addCity, updateCity } from '../../../api/cityApi';

export default function CityForm ({ cityToEdit, onCityAdded, onCityUpdated, countries }) {
  const [cityData, setCityData] = useState({
    name: '',
    country: '',
    cover: null,
  });

  const [initialCover, setInitialCover] = useState(null);

  useEffect(() => {
    if (cityToEdit) {
      setCityData({
        name: cityToEdit.name || '',
        country: cityToEdit.country || '',
        cover: null,
      });

      // Mantieni l'immagine attuale se stai modificando la città e non cambiando l'immagine
      setInitialCover(cityToEdit.cover || null);
    }
  }, [cityToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCityData({ ...cityData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCityData({ ...cityData, cover: file });
  };

  const handleSubmitCity = async (e) => {
    e.preventDefault();

    try {
      if (cityToEdit) {
        // Se l'utente non ha selezionato una nuova immagine, mantieni l'immagine attuale
        const updatedCityData = {
          ...cityData,
          initialCover: cityData.cover ? null : initialCover,
        };

        // Modifica della città esistente
        const updatedCity = await updateCity(cityToEdit._id, updatedCityData);
        onCityUpdated(updatedCity);
      } else {
        // Aggiunta di una nuova città
        const newCity = await addCity(cityData);
        onCityAdded(newCity);
      }

      // Resetta i dati del form
      setCityData({ name: '', country: '', cover: null });
      setInitialCover(null);
    } catch (error) {
      console.error('Error submitting city form:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmitCity}>
        <Form.Group className="mb-3" controlId="formBasicCityName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="name" value={cityData.name} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCityCountry">
          <Form.Label>Paese</Form.Label>
          <Form.Control as="select" name="country" value={cityData.country} onChange={handleInputChange} required>
            <option value="" disabled>Seleziona un paese</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCityCoutry">
          <Form.Label>Immagine</Form.Label>
          <Form.Control type="file" name="cover" onChange={handleFileChange} />
          {initialCover && (
            <div className="mt-2">
              <Image src={initialCover} alt="Current Cover" thumbnail />
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          {cityToEdit ? 'Aggiorna Città' : 'Aggiungi Città'}
        </Button>
      </Form>
    </>
  );
};
