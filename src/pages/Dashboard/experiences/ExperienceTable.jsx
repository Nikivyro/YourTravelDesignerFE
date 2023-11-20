import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchExperiences, updateExperience, deleteExperience } from '../../../reducers/experienceSlice';
import EditExperienceForm from './EditExperienceForm';
import { Link } from 'react-router-dom';

const ExperienceTable = ({experiences, cities}) => {
  const dispatch = useDispatch();
  // const experiences = useSelector((state) => state.experiences.data);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleExperienceUpdate = (experience) => {
    setSelectedExperience(experience);
    setShowEditModal(true);
  };

  const handleExperienceDelete = (id) => {
    setExperienceToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (experienceToDelete) {
      dispatch(deleteExperience(experienceToDelete));
      setShowDeleteModal(false);
      setExperienceToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setExperienceToDelete(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedExperience(null);
  };

  const handleSaveExperience = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Titolo</th>
            <th>Descrizione</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <tr key={experience._id}>
              <td><img src={experience.cover} className='img-fluid' alt={experience.name}/></td>
              <td>{experience.name}</td>
              <td>{experience.description}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleExperienceUpdate(experience)}
                >
                  <i className="bi bi-pencil me-1"></i> Modifica
                </Button>
                <Button variant="danger" onClick={() => handleExperienceDelete(experience._id)} className='my-2'>
                  <i className="bi bi-trash me-1"></i> Elimina
                </Button>
                <Link to={`/experiences/${experience._id}`} className='text-white text-decoration-none'>
                  <Button variant="warning"><i className="bi bi-eye me-1"></i> Guarda</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questa esperienza?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedExperience && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Esperienza</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditExperienceForm experienceData={selectedExperience} cities={cities}  onSave={handleSaveExperience}/>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ExperienceTable;
