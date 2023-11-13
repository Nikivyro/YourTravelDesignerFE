import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExperiencesByCategory } from '../reducers/experienceSlice';
import SingleExperience from './SingleExperience';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

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
          <p>Loading...</p>
        ) : status === 'failed' ? (
          <p>Error fetching experiences</p>
        ) : (
          <Row>
            {experiences.map((experience) => (
              <Col xs={6} lg={4} key={experience._id}>
                <SingleExperience data={experience} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}
