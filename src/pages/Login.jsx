import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authActions';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(formData));
      navigate('/user/profile');
    } catch (error) {
      setError('Credenziali non valide. Controlla email e password.');
      console.error('Errore durante il login:', error.message);
    }
  };
  

  return (
    <section className='d-flex justify-content-center align-items-center min-vh-100'>
      <Container>
        <Row>
          <Col>
            <h1 className='text-center'>Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              <Button type="submit">Accedi</Button>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>
        </Row>
      </Container>
    </section>
  )
}