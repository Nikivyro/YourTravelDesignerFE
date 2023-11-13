import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiencesByCity } from '../reducers/experienceSlice'; 
import { Col, Container, Row } from 'react-bootstrap';
import SingleExperience from '../components/SingleExperience';
import MainLayout from '../Layout/MainLayout';

export default function SearchResult() {
    const dispatch = useDispatch();
    const experiences = useSelector((state) => state.experiences.data);
    const status = useSelector((state) => state.experiences.status);
    const location = useLocation();
    const cityQuery = new URLSearchParams(location.search).get('city') || '';

    useEffect(() => {
      dispatch(fetchExperiencesByCity(cityQuery));
    }, [dispatch, cityQuery]);

    return (
        <MainLayout>
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
                <Col xs='12'><p>Risultati per <b>{cityQuery}</b></p></Col>
                {experiences.map((experience) => (
                    <Col xs={6} lg={4} key={experience._id}>
                        <SingleExperience data={experience} />
                    </Col>
                ))}
                </Row>
            )}
            </Container>
        </MainLayout>
  )
}
