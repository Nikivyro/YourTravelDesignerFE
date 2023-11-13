import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [cityQuery, setCityQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?city=${cityQuery}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><Link to='/'>Logo</Link></Navbar.Brand>
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
          <Nav
            className="ms-auto my-2 my-lg-0"
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Esci
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
