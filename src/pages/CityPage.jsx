import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchCity } from '../api/cityApi';
import Layout from '../Layout/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import ExperienceByCity from '../components/Experiences/ExperienceByCity';

export default function CityPage() {
  const { cityName } = useParams();
  
  const [city, setCity] = useState([]);

  const loadCity = async () => {
      try {
        const cityData = await fetchCity(cityName);
        setCity(cityData);
      } catch (error) {
        console.error('Error loading city:', error);
      }
  };

  useEffect(() => {
    loadCity();
  }, []);

  return (
    <Layout>
      <Container className='py-5'>
        <Row>
          <Col xs={12}>
            <h1>{city.name} / {city.country?.name}</h1>
            <img src={city.cover} alt={city.name} className='img-fluid my-4'/>
          </Col>
        </Row>
      </Container>
      <ExperienceByCity cityName={city.name}/>
    </Layout>
  )
}
