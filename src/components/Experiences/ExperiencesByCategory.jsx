import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiencesByCategory } from '../../reducers/experienceSlice';
import SingleExperience from './SingleExperience';
import { Col, Row } from 'react-bootstrap';

export default function ExperiencesByCategory() {
  const dispatch = useDispatch();
  const categoryExperiences = useSelector((state) => state.experiences.data);

  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory');
    
    const fetchData = async () => {
      if (storedCategory) {
        await dispatch(fetchExperiencesByCategory(storedCategory));
      }
    };

    fetchData();
  }, [dispatch]);

  console.log('Dentro category', categoryExperiences);

  return (
    <Row className='py-4'>
      <h2>Esperienze per categoria</h2>
      {categoryExperiences.map((exp) => (
        <Col key={exp._id} xs={12} md={6} lg={4}>
          {/* <h3>{exp.name}</h3> */}
          <SingleExperience data={exp}/>
        </Col>
      ))}
    </Row>
  );
}
