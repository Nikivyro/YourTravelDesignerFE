import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExperiencesByCategory } from '../../reducers/experienceSlice';
import SingleExperience from './SingleExperience';
import { Col, Container, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import './expericences.css';
import cultureSvg from './img/003-museum.svg'
import sportSvg from './img/002-running.svg'
import foodSvg from './img/001-restaurant.svg'
import natureSvg from './img/004-park.svg'

export default function AllExperiences() {
  const [selectedCategory, setSelectedCategory] = useState('Cultura');
  const experiences = useSelector((state) => state.experiences.data);
  const status = useSelector((state) => state.experiences.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExperiencesByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  const categoryIcons = {
    Cultura: cultureSvg,
    Gastronomia: foodSvg,
    Natura: natureSvg,
    Sport: sportSvg,
  };

  const handleTabChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section>
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={selectedCategory}
        onSelect={(category) => handleTabChange(category)}
        className="mb-3 justify-content-center align-items-center selectCategory"
      >
        {Object.keys(categoryIcons).map((category) => (
          <Tab eventKey={category} title={<><img src={categoryIcons[category]} alt={category} className="iconCategory" /><span>{category}</span></> } key={category}></Tab>
        ))}
      </Tabs>

      <Container className="my-5">
        {status === 'loading' ? (
          <Row className="text-center justify-content-center">
            <Spinner animation="grow" />
            <p className="mt-3">Caricamento in corso...</p>
          </Row>
        ) : status === 'failed' ? (
          <p>Errore nella ricezione dati. Riprova più tardi</p>
        ) : (
          <Row>
            {experiences.length === 0 ? (
              <Col xs={12} className="text-center">
                <p>Nessuna esperienza trovata per questa categoria.</p>
              </Col>
            ) : (
              experiences.map((experience) => (
                <Col xs={6} lg={3} key={experience._id} className="mb-4">
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