import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAuth } from '../reducers/authSlice';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <Row>
        <Col>        
          <h2>Profilo Utente</h2>
          {user ? (
            <div>
              <p>Nome: {user.firstName}</p>
              <p>Cognome: {user.lastName}</p>
              <p>Email: {user.email}</p>
              {/* Altre informazioni dell'utente */}
            </div>
          ) : (
            <p>Informazioni utente non disponibili.</p>
          )}
        </Col>
      </Row>
      <Link to='/'>Vai alla Home</Link>
    </Container>
  );
}