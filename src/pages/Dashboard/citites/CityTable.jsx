import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { deleteCity } from '../../../api/cityApi';
import CityForm from './CityForm';

export default function CityTable ({ cities, onCityDeleted, onCityUpdated, countries }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleDeleteCity = async (id) => {
    try {
      await deleteCity(id);
      onCityDeleted(id);
    } catch (error) {
      console.error('Error deleting city:', error.response?.data || error.message);
    }
  };

  const handleEditCity = (city) => {
    setSelectedCity(city);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCity(null);
    setShowEditModal(false);
  };
  
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city._id}>
              <td><img src={city.cover} className='img-fluid' alt={city.name} width={200}/></td>
              <td>{city.name}</td>
              <td>{city.country.name}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditCity(city)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteCity(city._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CityForm 
            cityToEdit={selectedCity} 
            onCityUpdated={onCityUpdated} 
            countries={countries}
            show={showEditModal} 
            handleClose={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
