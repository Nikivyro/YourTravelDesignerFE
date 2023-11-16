import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/authActions';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const errorMessage = useSelector((state) => state.auth.error);

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
      console.error('Errore durante il login:', error);
    }
  };

  return (
    <section className='d-flex justify-content-center align-items-center min-vh-100'>
      <Container>
        <Row className='justify-content-center'>
          <Col lg={4}>
            <h1 className='text-center'>Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className='mb-3'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formPassword" className='mb-3'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              {errorMessage && <Alert variant="danger" className='my-2'>{errorMessage}</Alert>}
              <Button type="submit">Accedi</Button>
            </Form>
            <p className='mt-3'>Non sei ancora registrato? <Link to='/user/register'>Registrati ora</Link></p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
