import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperiencesByCategory } from '../../reducers/experienceSlice';

export default function ExperiencesByCategory({experienceId, categoryName}) {
    const dispatch = useDispatch();
    const categoryExperiences = useSelector((state) => state.experiences.data);
  
    useEffect(() => {
      const fetchData = async () => {
        const category = categoryName;
        await dispatch(fetchExperiencesByCategory(category));
      };
  
      fetchData();
    }, [dispatch, experienceId]);

  console.log(categoryExperiences);

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
  )
}
