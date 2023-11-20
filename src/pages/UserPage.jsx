import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth, updateProfile } from '../reducers/authSlice';
import { Col, Container, Row, Button, Form, Spinner } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import { fetchExperienceByUser } from '../reducers/experienceSlice';
import CreateExperience from './Dashboard/experiences/CreateExperience';
import { fetchCities } from '../api/cityApi';
import ExperienceTable from './Dashboard/experiences/ExperienceTable';

export default function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const experienceUser = useSelector((state) => state.experiences.data);
  const status = useSelector((state) => state.experiences.status);
  const [cities, setCities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      loadCities();
      dispatch(fetchExperienceByUser({ userId: user._id }));
    }
  }, [user, dispatch]);

  const loadCities = async () => {
    try {
      const citiesData = await fetchCities();
      setCities(citiesData);
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    dispatch(updateProfile(editedUser));
    setIsEditing(false);
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <Layout>
      <Container className='py-5'>
        <Row>
          <Col>
            {status === 'loading' && <p>Caricamento in corso...</p>}
            {status === 'failed' && <p>Errore nel caricamento delle esperienze</p>}
            {user && !isEditing && (
              <div>
                <h2>Ciao, {user.firstName}!</h2>
                <div className="border p-3 position-relative rounded">
                  <h3>Le tue info</h3>
                  <p><span className='fw-bold'>Nome:</span> {user.firstName}</p>
                  <p><span className='fw-bold'>Cognome:</span> {user.lastName}</p>
                  <p><span className='fw-bold'>Ragione Sociale:</span> {user.businessName}</p>
                  <p><span className='fw-bold'>Email:</span> {user.email}</p>
                  <p><span className='fw-bold'>Telefono:</span> {user.phone}</p>
                  <Button variant="primary" onClick={handleEditClick}>
                  <i className="bi bi-pencil me-1"></i> Modifica Profilo
                  </Button>
                </div>
                <Row className='my-4'>
                  <h3>Le tue esperienze</h3>              
                  <Col className='text-end mb-4'>
                    <Button onClick={handleToggleCreateForm}>
                      {showCreateForm ? 'Chiudi il form' : 'Crea una nuova esperienza'}
                    </Button>
                  </Col>
                  
                  {showCreateForm && <CreateExperience cities={cities} />}
                  <ExperienceTable experiences={experienceUser} cities={cities}/>
                </Row>
              </div>
            )}
            {!isEditing && status === 'succeeded' && experienceUser.length === 0 && (
              <p>Nessuna esperienza trovata per questo utente</p>
            )}
            {!user && (
                <div className="text-center">
                  <Spinner animation='grow'/>
                  <p>Caricamento in corso...</p>
                </div>
            )}
            {isEditing && (
              <Form>
                <Form.Group controlId="formFirstName" className='mb-4'>
                  <Form.Label className='fw-bold mb-2'>Nome:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={editedUser.firstName || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" className='mb-4'>
                  <Form.Label className='fw-bold mb-2'>Cognome:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={editedUser.lastName || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBusinessName" className='mb-4'>
                  <Form.Label className='fw-bold mb-2'>Ragione Sociale:</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessName"
                    value={editedUser.businessName || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className='mb-4'>
                  <Form.Label className='fw-bold mb-2'>E-mail:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editedUser.email || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className='mb-4'>
                  <Form.Label className='fw-bold mb-2'>Telefono:</Form.Label>
                  <Form.Control
                    type="phone"
                    name="phone"
                    value={editedUser.phone || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleSaveClick} className='me-2'>
                  Salva Modifiche
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Annulla Modifiche
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
