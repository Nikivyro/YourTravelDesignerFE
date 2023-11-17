import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from '../logo.svg' 

export default function Footer() {
  return (
    <footer className='bg-dark text-white pt-5'>
      <Container>
        <Row>
          {/* <Col md={4}>
            <h5 className="title">Titolo 1</h5>
            <ul>
              <li>link 1</li>
              <li>link 2</li>
              <li>link 3</li>
              <li>link 4</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="title">Titolo 2</h5>
            <ul>
              <li>link 1</li>
              <li>link 2</li>
              <li>link 3</li>
              <li>link 4</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="title">Titolo 3</h5>
            <ul>
              <li>link 1</li>
              <li>link 2</li>
              <li>link 3</li>
              <li>link 4</li>
            </ul>
          </Col> */}
          <Col xs={12}>
            <img src={logo} className='img-fluid mb-4' width={180}/>
            <p className='small mb-0'>&copy; 2023 - Your Travel Designer</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
