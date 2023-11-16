import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { fetchExperienceById } from '../reducers/experienceSlice';
import { useDispatch, useSelector } from 'react-redux';
import ExperiencesByCategory from '../components/Experiences/ExperiencesByCategory';
import ExperienceByCity from '../components/Experiences/ExperienceByCity';

export default function ExperienceDetail() {
    const { experienceId } = useParams();
    const dispatch = useDispatch();
    const experience = useSelector((state) => state.experiences.data[0]);
    const status = useSelector((state) => state.experiences.status);
    const error = useSelector((state) => state.experiences.error);

    useEffect(() => {
        dispatch(fetchExperienceById(experienceId));
    }, [dispatch, experienceId]);

    return (
        <Layout>
            <Container>
                <Row>
                    <Col xs={12} className='py-3 text-start'>
                        <Link to="/"><Button variant="primary"><i className="bi bi-house me-1"></i>Torna alla Home</Button></Link>
                    </Col>
                    <Col xs={12}>
                        {status === 'loading' && (
                            <>
                                <Spinner animation="grow" />
                                <p>Caricamento in corso...</p>
                            </>
                        )}
                        {status === 'failed' && (
                            <p>Si è verificato un errore: {error}</p>
                        )}
                        {status === 'succeeded' && experience && experience._id === experienceId && (
                            <>
                          <Row >
                            <Col xs={12} className='mb-4'>
                                <span>{experience.type} / {experience.category}</span>
                                <h1>{experience.name} - {experience.location?.city?.name ?? "City Not Available"}</h1>
                                <span>Fornitore: {experience.supplier.businessName}</span>
                                <img src={experience.cover} className='img-fluid mt-4' alt={experience.name}/>
                            </Col>
                            <Col xs={12} className='mb-4'>
                                <Card>
                                    <Card.Body>
                                        <h3>Descrizione dell'esperienza</h3>
                                        <p>{experience.description}</p>
                                        <span>€ {experience.price} / a persona</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} className='mb-4'>
                                <Card>
                                    <Card.Body>
                                        <h3>Dettagli sull'esperienza</h3>
                                        <p>Duration: {experience.tourDetails.duration}</p>
                                        <p>Languages: {experience.tourDetails.languages}</p>
                                        <p>People: {experience.tourDetails.people}</p>
                                        
                                        <h3>Meeting Point:</h3>
                                        <p>Address: {experience.tourDetails.meetingPoint[0].address}</p>
                                        <p>Latitude: {experience.tourDetails.meetingPoint[0].latitude}</p>
                                        <p>Longitude: {experience.tourDetails.meetingPoint[0].longitude}</p>
                                    
                                        <h3>Servizi:</h3>
                                        <ul>
                                            {experience.tourDetails.services.map((service) => (
                                            <li key={service._id}>
                                                {service.service} - {service.included ? 'Included' : 'Not Included'}
                                            </li>
                                            ))}
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className='mb-4'>
                                <Card>
                                    <Card.Body>
                                        <h3>Itinerario</h3>
                                        {experience.itineraryStops.map((stop) => (
                                            <div key={stop._id}>
                                            <h4>{stop.day}</h4>
                                            <ul>
                                                {stop.stops.map((tourStop) => (
                                                <li key={tourStop._id}>
                                                    <p>Name: {tourStop.name}</p>
                                                    <p>Description: {tourStop.description}</p>
                                                    <p>Location: {tourStop.location.latitude}, {tourStop.location.longitude}</p>
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                          </Row>
                          </>
                        )}  
                    </Col>
                </Row>
            </Container>
            <Container>
                <ExperiencesByCategory experienceId={experienceId} categoryName={experience.category}/>
            {status === 'loading' && (
                <>
                    <Spinner animation="grow" />
                    <p>Caricamento in corso...</p>
                </>
            )}
            {status === 'failed' && (
                <p>Si è verificato un errore: {error}</p>
            )}
            {status === 'succeeded' && experience && (
                <>
                {/* Resto del codice per la renderizzazione di ExperienceDetail */}
                {/* <ExperienceByCity cityName={experience.location.city.name}/> */}
                </>
            )}
            </Container>
        </Layout>
    );
}
