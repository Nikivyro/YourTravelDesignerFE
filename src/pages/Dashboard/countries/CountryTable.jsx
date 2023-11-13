import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { deleteCountry } from '../../../api/countryApi';
import CountryForm from './CountryForm';

export default function CountryTable({ countries, onCountryDeleted, onCountryUpdated }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleDeleteCountry = async (id) => {
    try {
      await deleteCountry(id);
      onCountryDeleted(id);
    } catch (error) {
      console.error('Error deleting country:', error.response?.data || error.message);
    }
  };

  const handleEditCountry = (country) => {
    setSelectedCountry(country);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCountry(null);
    setShowEditModal(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country._id}>
              <td>{country.name}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditCountry(country)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteCountry(country._id)}>
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
          <CountryForm countryToEdit={selectedCountry} onCountryUpdated={onCountryUpdated} />
        </Modal.Body>
      </Modal>
    </>
  );
}