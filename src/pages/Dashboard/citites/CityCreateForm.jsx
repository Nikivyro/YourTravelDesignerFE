import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { addCity } from '../../../api/cityApi';

export default function CityCreateForm({ onCityAdded, countries, show, handleClose }) {
  const [cityData, setCityData] = useState({
    name: '',
    country: '',
    cover: null,
  });

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
      const newCity = await addCity(cityData);
      onCityAdded(newCity);

      setCityData({ name: '', country: '', cover: null });
      handleClose(); // Chiudi il modal dopo l'invio del form
    } catch (error) {
      console.error('Error submitting city form:', error.response?.data || error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add City</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitCity}>
          <Form.Group className="mb-3" controlId="formBasicCityName">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="name" value={cityData.name} onChange={handleInputChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCityCountry">
            <Form.Label>Paese</Form.Label>
            <Form.Control as="select" name="country" value={cityData.country} onChange={handleInputChange} required>
              <option value="" disabled>Select a country</option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCityCoutry">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="cover" onChange={handleFileChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add City
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
