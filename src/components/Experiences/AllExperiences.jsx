import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExperiencesByCategory } from '../../reducers/experienceSlice';
import SingleExperience from './SingleExperience';
import { Col, Container, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import './expericences.css';

export default function AllExperiences() {
  const [selectedCategory, setSelectedCategory] = useState('Cultura');
  const experiences = useSelector((state) => state.experiences.data);
  const status = useSelector((state) => state.experiences.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExperiencesByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleTabChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section>
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={selectedCategory}
        onSelect={(category) => handleTabChange(category)}
        className="mb-3 justify-content-center align-items-center"
      >
        <Tab eventKey="Cultura" title="Cultura"></Tab>
        <Tab eventKey="Gastronomia" title="Gastronomia"></Tab>
        <Tab eventKey="Natura" title="Natura"></Tab>
        <Tab eventKey="Sport" title="Sport"></Tab>
      </Tabs>

      <Container className='my-5'>
        {status === 'loading' ? (
          <>
              <Spinner animation="grow" />
              <p>Caricamento in corso...</p>
          </>
        ) : status === 'failed' ? (
          <p>Errore nella ricezione dati. Riprova più tardi</p>
        ) : (
          <Row>
            {experiences.length === 0 ? (
              <Col  xs={12} className="text-center"><p>Nessuna esperienza trovata per questa categoria.</p></Col>
            ) : (
              experiences.map((experience) => (
                <Col xs={6} lg={3} key={experience._id} className='mb-4'>
                  <SingleExperience data={experience} />
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>
    </section>
  );
}
