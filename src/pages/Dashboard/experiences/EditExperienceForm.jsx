// EditExperienceForm.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience } from '../../../reducers/experienceSlice'; // Importa l'azione updateExperience

const EditExperienceForm = ({ experienceId }) => {
  const dispatch = useDispatch();
  const experience = useSelector(state => state.experiences.data.find(exp => exp._id === experienceId));
  const [formData, setFormData] = useState({ ...experience });

  useEffect(() => {
    // Aggiorna lo stato con i dettagli dell'esperienza quando l'ID dell'esperienza cambia
    setFormData({ ...experience });
  }, [experienceId, experience]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chiamata all'azione updateExperience con i dati del form
    dispatch(updateExperience({ experienceId, dataToUpdate: formData }));
  };

  const handleFileChange = (e) => {
    // Aggiorna lo stato con i file selezionati dall'utente per la galleria
    const files = Array.from(e.target.files);
    setFormData({ ...formData, gallery: files });
  };

  if (!experience) {
    return <div>Caricamento...</div>;
  }

  // Restituisci il form HTML per la modifica dell'esperienza
  return (
    <form onSubmit={handleSubmit}>
      {/* Campi del form per modificare i dettagli dell'esperienza */}
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Salva Modifiche</button>
    </form>
  );
};

export default EditExperienceForm;
