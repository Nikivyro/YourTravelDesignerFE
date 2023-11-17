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
import logo from '../logo.svg';
export default function Navigation() {
  const dispatch = useDispatch()
  const [cityQuery, setCityQuery] = useState('');
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?city=${cityQuery}`);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#"><Link to='/'><img src={logo} alt="YourTravelDesigner" width={50}/></Link></Navbar.Brand>
        <Form onSubmit={handleSearch} className="d-flex">
          <Form.Control
            type="search"
            placeholder="Cerca per città"
            className="me-2"
            aria-label="Search"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
          />
          <Button variant="outline-success" type="submit">
            Cerca
          </Button>
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0">
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
              <Link to="/user/login">Accedi</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}