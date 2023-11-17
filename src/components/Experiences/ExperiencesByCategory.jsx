import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiencesByCategory } from '../../reducers/experienceSlice';

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
    <div>
      <h2>Esperienze per categoria</h2>
      {categoryExperiences.map((exp) => (
        <div key={exp._id}>
          <h3>{exp.name}</h3>
          {/* Aggiungi il resto delle informazioni che desideri visualizzare */}
        </div>
      ))}
    </div>
  );
}
