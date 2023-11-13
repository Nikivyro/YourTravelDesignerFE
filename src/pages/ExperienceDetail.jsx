import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
// import MainLayout from '../layout/MainLayout';
import axios from 'axios';

export default function ExperienceDetail() {
    const { experienceId } = useParams();
    const [experience, setExperience] = useState(null);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/experiences/${experienceId}`);
            console.log(response);
            if (response.status === 200) {
                setExperience(response.data.experience);
            }
        } catch (err) {
            console.error('Errore nella richiesta API:', err);
            setError(err.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, [experienceId]);

    // console.log(experienceId);

    return (
            <Container>
                <Row>
                    <Col xs={12} className='py-3 text-start'>
                        <Link to="/"><Button variant="primary"><i className="bi bi-house me-1"></i>Torna alla Home</Button></Link>
                    </Col>
                    <Col xs={12}>
                        {error ? (
                            <p>Si è verificato un errore: {error}</p>
                        ) : experience ? (
                          <>
                            <h1>{experience.name}</h1>
                            <p>Type: {experience.type}</p>
                            <p>Category: {experience.category}</p>
                            {experience.description}
                          </>
                        ) : (
                            <>
                                <Spinner animation="grow" />
                                <p>Caricamento in corso...</p>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
    );
}
