import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './Hero.css';

export default function Hero() {
  return (
    <section className='hero justify-content-center align-items-center d-flex'>
        <Container>
            <Row>
                <Col className='text-white'>
                    <h1>Your Travel Designer</h1>
                    <h2>Le tue migliori esperienze, i tuoi miglori ricordi</h2>
                </Col>
            </Row>
        </Container>
    </section>
  )
}
