import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExperience, updateExperience } from '../../../reducers/experienceSlice';

export default function ExperienceTable() {
    const experiences = useSelector((state) => state.experiences.data); // Ottieni le esperienze dallo stato Redux
    const dispatch = useDispatch();
  
    const handleDelete = (experienceId) => {
      dispatch(deleteExperience(experienceId)); // Azione per eliminare l'esperienza
    };
  
    const handleUpdate = (updatedData) => {
      dispatch(updateExperience(updatedData)); // Azione per aggiornare l'esperienza
    };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          {/* Aggiungi altre intestazioni per le colonne della tabella */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {experiences.map((experience) => (
          <tr key={experience._id}>
            <td>{experience.name}</td>
            {/* Visualizza altri dati delle esperienze nelle celle della tabella */}
            <td>
              <button onClick={() => handleUpdate({ /* ...passa i dati aggiornati */ })}>Edit</button>
              <button onClick={() => handleDelete(experience._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
