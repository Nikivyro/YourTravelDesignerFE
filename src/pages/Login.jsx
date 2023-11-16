import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
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
  const [error, setError] = useState(null);

  // Ottieni lo stato di loading dalla Redux store
  const isLoading = useSelector((state) => state.auth.isLoading);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Se c'è un token nello stato, reindirizza alla pagina dell'utente
    if (token) {
      navigate('/user/profile');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Esegui la action di login
      await dispatch(login(formData));
    } catch (error) {
      setError('Credenziali non valide. Controlla email e password.');
      console.error('Errore durante il login:', error.message);
    }
  };

  return (
    <section className='d-flex justify-content-center align-items-center min-vh-100'>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={9} md={6} lg={4}>
            <h1 className='text-center'>Login</h1>
            <Form onSubmit={handleSubmit} className='my-5'>
              <Form.Group controlId="formEmail">
                <Form.Label className='fw-bold mb-2'>Email:</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label className='fw-bold mb-2'>Password:</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </Form.Group>
              <Button type="submit" className='mt-4' disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : 'Accedi'}
              </Button>
            </Form>
            <p>Non sei ancora registrato <Link to='/user/register'>Registrati ora</Link></p>
            {error && <Alert variant="danger">{error}</Alert>}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
