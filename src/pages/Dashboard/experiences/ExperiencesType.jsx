import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiencesByType } from '../../../reducers/experienceSlice';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Layout from '../../../Layout/Layout';
import SingleExperience from '../../../components/Experiences/SingleExperience';

export default function ExperiencesType() {
  const { type } = useParams();
  const dispatch = useDispatch();
  const experiences = useSelector(state => state.experiences.data);

  useEffect(() => {
    dispatch(fetchExperiencesByType(type));
  }, [dispatch, type]);

  return (
    <Layout>
      <Container className='py-4'>
        <Row className='mb-4'>
          <Col>        
            <h2>{`Esperienze di tipo: ${type}`}</h2>
          </Col>
        </Row>
        <Row>
          {experiences.map((experience) => (
            <Col key={experience._id} xs={6} md={3} lg={4} className='mb-4'>
              <SingleExperience data={experience}/>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}
