import React, { useState, useEffect } from 'react';
import { Form, Button, Image, Modal } from 'react-bootstrap';
import { updateCity } from '../../../api/cityApi';

export default function CityEditForm({ cityToEdit, onCityUpdated, countries, show, handleClose }) {
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
      const updatedCityData = {
        ...cityData,
        cover: cityData.cover || initialCover || null,
      };

      const updatedCity = await updateCity(cityToEdit._id, updatedCityData);
      onCityUpdated(updatedCity);

      setCityData({ name: '', country: '', cover: null });
      setInitialCover(null);
      handleClose(); // Chiudi il modal dopo l'invio del form
    } catch (error) {
      console.error('Error submitting city form:', error.response?.data || error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit City</Modal.Title>
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
            {initialCover && (
              <div className="mt-2">
                <Image src={initialCover} alt="Current Cover" thumbnail />
              </div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Update City
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}