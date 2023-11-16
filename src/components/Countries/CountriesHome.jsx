import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { fetchCountries } from '../../api/countryApi';
import SingleCountry from './SingleCountry';

export default function CountriesHome() {
    const [countries, setCountries] = useState([]);

    const loadCountries = async () => {
        try {
          const countriesData = await fetchCountries();
          setCountries(countriesData);
        } catch (error) {
          console.error('Error loading countries:', error);
        }
      };

    useEffect(() => {
        loadCountries();
    }, []);

    return (
    <Container className='countryHome py-5'>
        <Row>
            <Col xs={12}>
                <h2>Quale città vuoi visitare?</h2>
            </Col>
        </Row>
        <Row>
        {countries.map((country) => (
          <SingleCountry country={country} key={country._id}/>
        ))}
        </Row>
    </Container>
  )
}
