import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Register() {
  const [registrationStatus, setRegistrationStatus] = useState({
    success: false,
    error: null,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    role: 'Agenzia',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL_ENDPOINT}/user/register`, formData);
      console.log(response.data);
      setRegistrationStatus({
        success: true,
        error: null,
      });
    } catch (error) {
      console.error('Errore durante la registrazione:', error.response.data.message);
      setRegistrationStatus({
        success: false,
        error: error.response.data.message,
      });
    }
  };

  return (
    <section className='d-flex justify-content-center align-items-center min-vh-100'>
      <Container>
        <Row className='justify-content-center'>
          <Col lg={4}>
          <h1 className='text-center mb-4'>Registrazione</h1>
          <p className='mt-3'>Sei già registrato? <Link to='/user/login'>Vai al login</Link></p>
          {registrationStatus.error && (
            <Alert variant="danger">{registrationStatus.error}</Alert>
          )}
          {registrationStatus.success && (
            <Alert variant="success">Registrazione avvenuta con successo. Ora puoi effettuare il <Link to='/user/login'>login</Link>.</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName" className='mb-3'>
              <Form.Label className='fw-bold'>Nome</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formLastName" className='mb-3'>
              <Form.Label className='fw-bold'>Cognome</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formBusinessName" className='mb-3'>
              <Form.Label className='fw-bold'>Ragione Sociale</Form.Label>
              <Form.Control type="text" name="businessName" value={formData.businessName} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formPhone" className='mb-3'>
              <Form.Label className='fw-bold'>Numero</Form.Label>
              <Form.Control type="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formEmail" className='mb-3'>
              <Form.Label className='fw-bold'>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formPassword" className='mb-3'>
              <Form.Label className='fw-bold'>Password:</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="formRole" className='mb-3'>
              <Form.Label className='fw-bold'>Sei un'agenzia o un tour operator?:</Form.Label>
              <Form.Control as="select" name="role" value={formData.role} onChange={handleChange} required>
                <option value="Agenzia">Agenzia</option>
                <option value="Tour Operator">Tour Operator</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className='my-4'>
              Registrati
            </Button>
          </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
