import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../reducers/authSlice';
import { InputGroup } from 'react-bootstrap';
import logo from '../logo.svg';

export default function Navigation() {
  const dispatch = useDispatch()
  const [cityQuery, setCityQuery] = useState('');
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?city=${cityQuery}`);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleTypeClick = (type) => {
    setSelectedType(type);
    navigate(`/experiences/type/${type}`);
  };

  return (
    <Navbar expand="lg" className="navbar-dark bg-blue sticky-top">
      <Container>
        <Navbar.Brand href="#"><Link to='/'><img src={logo} alt="YourTravelDesigner" width={50}/></Link></Navbar.Brand>
        <Form onSubmit={handleSearch} className="d-flex">
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Cerca per città"
              aria-label="Search"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
            />
            <Button variant="dark" type="submit">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 text-white">
            <Nav.Link onClick={() => handleTypeClick('Tour')}>Tour</Nav.Link>
            <Nav.Link onClick={() => handleTypeClick('Pacchetto')}>Pacchetti</Nav.Link>
            <Nav.Link onClick={() => handleTypeClick('Itinerario')}>Itinerari</Nav.Link>
            {user ? (
              <NavDropdown title={`Ciao, ${user.firstName}`} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/user/profile">
                  Vai al profilo
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Esci
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/user/login" className='text-white text-decoration-none'><i className="bi bi-person"></i>Accedi</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}