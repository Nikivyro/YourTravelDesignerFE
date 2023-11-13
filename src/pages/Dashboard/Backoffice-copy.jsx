import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row, Table, Button, Modal, Form } from 'react-bootstrap';

export default function Backoffice() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cityData, setCityData] = useState({
    name: '',
    country: '',
    cover: null,
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Carica la lista di città e paesi al caricamento del componente
    fetchCities();
    fetchCountries();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/cities`);
      setCities(response.data.cities);
    } catch (error) {
      console.error('Error fetching cities:', error.response?.data || error.message);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/countries`);
      setCountries(response.data.countries);
    } catch (error) {
      console.error('Error fetching countries:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCityData({ ...cityData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCityData({ ...cityData, cover: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prima effettua l'upload dell'immagine su Cloudinary
      const formData = new FormData();
      formData.append('cover', cityData.cover);

      const imageResponse = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/cities/cloudUpload`, formData);

      // Successivamente, invia i dati della città
      const cityResponse = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/city/create`, {
        name: cityData.name,
        country: cityData.country,
        cover: imageResponse.data.cover,
      });

      console.log('City created:', cityResponse.data);

      // Chiudi il modal e aggiorna la lista di città
      handleCloseModal();
      fetchCities();
    } catch (error) {
      console.error('Error creating city:', error.response?.data || error.message);
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_URL_ENDPOINT}/city/delete/${id}`);
      console.log('City deleted:', response.data);

      // Aggiorna la lista di città dopo l'eliminazione
      fetchCities();
    } catch (error) {
      console.error('Error deleting city:', error.response?.data || error.message);
    }
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setCityData({ name: '', country: '', cover: null });
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div>Backoffice</div>
        </Col>
        <Col xs={12}>
          <div>Gestione Paesi</div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country._id}>
                  <td>{country._id}</td>
                  <td>{country.name}</td>
                  <td>Edit / Delete</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs={12}>
          <div>Gestione Città</div>
          <Button variant="primary" onClick={handleShowModal}>
            Add City
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city._id}>
                  <td>{city._id}</td>
                  <td>{city.name}</td>
                  <td>{city.country.name}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteCity(city._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal per l'aggiunta di una nuova città */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCityName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter city name" name="name" value={cityData.name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control as="select" name="country" value={cityData.country} onChange={handleInputChange} required>
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCoverImage">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control type="file" name="cover" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
