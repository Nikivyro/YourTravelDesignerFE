import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { fetchExperienceById } from '../reducers/experienceSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ExperienceDetail() {
    const { experienceId } = useParams();
    const dispatch = useDispatch();
    const experience = useSelector((state) => state.experiences.data[0]);
    const status = useSelector((state) => state.experiences.status);
    const error = useSelector((state) => state.experiences.error);

    useEffect(() => {
        dispatch(fetchExperienceById(experienceId));
      }, [dispatch, experienceId]);
    
    useEffect(() => {
    // Imposta la categoria in localStorage quando il valore cambia
    if (experience && experience.category) {
        localStorage.setItem('selectedCategory', experience.category);
    }
    }, [experience]);

    return (
        <Layout>
            <Container className='py-4'>
                <Row>
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
                            <Col xs={12} className='mb-2'>
                                <span>{experience.type} / {experience.category}</span>
                                <h1>{experience.name} - {experience.location?.city?.name ?? "City Not Available"}</h1>
                                <span>Fornitore: {experience.supplier.businessName}</span>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={12} lg={8} className='mb-4 mb-lg-0'>
                                        <img src={experience.cover} className='img-fluid my-4 w-100' alt={experience.name}/>
                                    </Col>
                                    <Col xs={12} lg={4} className='align-self-center'>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className='fw-bold h3 border-bottom pb-2'>Contatta il fornitore</Card.Title>
                                                <ul className='list-unstyled'>
                                                    <li className='my-3'><a href={`tel:${experience.supplier.phone}`} className='text-dark text-decoration-none'><i className="bi bi-phone me-1"></i>+ {experience.supplier.phone}</a></li>
                                                    <li><a href={`mailto:${experience.supplier.email}`} className='text-dark text-decoration-none'><i className="bi bi-envelope me-1"></i> {experience.supplier.email}</a></li>
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
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
                                        <p><i className="bi bi-clock-history me-1"></i> {experience.tourDetails.duration}</p>
                                        <p><i className="bi bi-translate me-1"></i> {experience.tourDetails.languages}</p>
                                        <p><i className="bi bi-people me-1"></i> {experience.tourDetails.people} pax</p>
                                        
                                        <h3>Meeting Point:</h3>
                                        <p>
                                            {experience.tourDetails.meetingPoint && experience.tourDetails.meetingPoint.length > 0 && experience.tourDetails.meetingPoint[0].address && (
                                                <>
                                                    <i className="bi bi-geo-alt me-1"></i> {experience.tourDetails.meetingPoint[0].address} - 
                                                    {experience.tourDetails.meetingPoint[0].latitude && experience.tourDetails.meetingPoint[0].longitude && (
                                                        <a
                                                            href={`https://maps.google.com/?q=@${experience.tourDetails.meetingPoint[0].latitude},${experience.tourDetails.meetingPoint[0].longitude}`}
                                                            className=''
                                                            target='_blank'
                                                            title='Indicazioni MeetingPoint'
                                                        >
                                                            Apri maps
                                                        </a>
                                                    )}
                                                </>
                                            )}
                                            {(!experience.tourDetails.meetingPoint || experience.tourDetails.meetingPoint.length === 0 || !experience.tourDetails.meetingPoint[0].address) && (
                                                <p>Posizione di incontro non disponibile.</p>
                                            )}
                                        </p>


                                        <h3>Servizi:</h3>
                                        <ul className='list-unstyled'>
                                        {experience.tourDetails.services.map((service) => (
                                            <li key={service._id}>
                                            <span className={service.included ? 'text-success' : 'text-danger'}>
                                                {service.included ? <i className="bi bi-check2"></i> : <i className="bi bi-x"></i>} - {service.service} 
                                            </span>
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
                                                            <p>{tourStop.name}</p>
                                                            <p>Descrizione: {tourStop.description}</p>
                                                            {tourStop.location &&
                                                                tourStop.location.latitude !== undefined &&
                                                                tourStop.location.longitude !== undefined && (
                                                                    <a
                                                                        href={`https://maps.google.com/?q=@${tourStop.location.latitude},${tourStop.location.longitude}`}
                                                                        className=''
                                                                        target='_blank'
                                                                        title='Indicazioni MeetingPoint'
                                                                    >
                                                                        Apri maps
                                                                    </a>
                                                                )}
                                                            {(!tourStop.location ||
                                                                tourStop.location.latitude === undefined ||
                                                                tourStop.location.longitude === undefined) && <p></p>}
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
        </Layout>
    );
}
