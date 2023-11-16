import React, { useCallback, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchExperiencesByLocation } from '../../reducers/experienceSlice'; // Aggiorna l'importazione
import { useDispatch, useSelector } from 'react-redux';
import SingleExperience from './SingleExperience';

export default function ExperienceByCity({ cityName }) {
    const dispatch = useDispatch();
    const experiences = useSelector((state) => state.experiences.data);
    const status = useSelector((state) => state.experiences.status);
  
    useEffect(() => {
      // Chiamata per ottenere le esperienze associate alla città
      dispatch(fetchExperiencesByLocation(cityName));
    }, [dispatch, cityName]);

  return (
    <Container>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'failed' ? (
        <Row>
          <Col xs='12' className='py-4'>
            <p>Nessun risultato trovato. Riprova la ricerca con altri dati</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs='12'>
            <h3>Tour, pacchetti e itinerari disponibili per <u>{cityName}</u></h3>
          </Col>
          {experiences.map((experience) => (
              <Col xs={6} lg={3} key={experience._id} className='mb-4'>
              <SingleExperience data={experience} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
