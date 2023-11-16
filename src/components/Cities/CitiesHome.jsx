import React, { useEffect, useState } from 'react'
import { fetchCities } from '../../api/cityApi'
import { Col, Container, Row } from 'react-bootstrap';
import SingleCity from './SingleCity';
import './cities.css';
export default function CitiesHome() {
    const [cities, setCities] = useState([]);

    const loadCities = async () => {
        try {
          const citiesData = await fetchCities();
          setCities(citiesData);
        } catch (error) {
          console.error('Error loading cities:', error);
        }
    };

    useEffect(() => {
        loadCities();
    }, []);

    return (
    <Container className='citiesHome py-5'>
        <Row>
            <Col xs={12}>
                <h2>Quale città vuoi visitare?</h2>
            </Col>
        </Row>
        <Row>
        {cities.map((city) => (
          <SingleCity city={city} key={city._id}></SingleCity>
        ))}
        </Row>
    </Container>
  )
}
