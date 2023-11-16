import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth } from '../reducers/authSlice';
// import { updateUser } from '../reducers/authActions';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

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
    // dispatch(updateUser(editedUser));
    setIsEditing(false);
  };

  return (
    <Container>
      <Row>
        <Col>        
          <h2>Profilo Utente</h2>
          {user && !isEditing && (
            <div>
              <p>Nome: {user.firstName}</p>
              <p>Cognome: {user.lastName}</p>
              <p>Email: {user.email}</p>
              {/* Altre informazioni dell'utente */}
              <Button onClick={handleEditClick}>Modifica Profilo</Button>
            </div>
          )}
          {isEditing && (
            <div>
              <Form.Group controlId="formFirstName">
                <Form.Label>Nome:</Form.Label>
                <Form.Control type="text" name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Cognome:</Form.Label>
                <Form.Control type="text" name="lastName" value={editedUser.lastName} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
              </Form.Group>
              {/* Aggiungi altri campi per le informazioni dell'utente che possono essere modificate */}
              <Button variant="success" onClick={handleSaveClick}>Salva Modifiche</Button>
            </div>
          )}
        </Col>
      </Row>
      <Link to='/'>Vai alla Home</Link>
    </Container>
  );
}
