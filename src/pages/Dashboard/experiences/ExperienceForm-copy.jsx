import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { uploadGallery, updateExperience, createExperience } from '../../../reducers/experienceSlice';
import { useDispatch } from 'react-redux';
import MultiFileInput from './MultiFileInput';

const ExperienceForm = ({ onSubmit, initialData }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
    name: '',
    type: 'Tour',
    category: 'Cultura',
    gallery: [],
    description: '',
    price: 0,
    location: {
      city: '',
    },
    itineraryStops: [
      {
        day: '',
        stops: [
          {
            name: '',
            description: '',
            location: [{ latitude: '', longitude: '' }],
          },
        ],
      },
    ],
    tourDetails: {
      services: [{ service: '', included: false }],
      meetingPoint: [{ address: '', latitude: '', longitude: '' }],
      people: 0,
      duration: '',
      languages: 'Italiano',
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, fieldName, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData[fieldName][index] = value;
      return newData;
    });
  };

  const handleAddStop = () => {
    setFormData((prevData) => ({
      ...prevData,
      itineraryStops: [
        ...prevData.itineraryStops,
        {
          day: '',
          stops: [{ name: '', description: '', location: [{ latitude: '', longitude: '' }] }],
        },
      ],
    }));
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      gallery: [...prevData.gallery, { filename: '', imageUrl: '' }],
    }));
  };

  const handleImageUpload = async (index, file) => {
    try {
      const formData = new FormData();
      formData.append('gallery', file);
  
      const response = await dispatch(uploadGallery({ experienceId: null, files: formData }));
  
      // Verifica se payload e gallery sono definiti prima di accedere agli elementi
      if (response.payload && response.payload.gallery && response.payload.gallery.length > 0) {
        const uploadedImage = response.payload.gallery[0];
  
        setFormData((prevData) => {
          const updatedGallery = [...prevData.gallery];
          console.log('updatedGallery', updatedGallery);
          updatedGallery[index] = {
            filename: uploadedImage.filename,
            imageUrl: uploadedImage.imageUrl,
          };
  
          return { ...prevData, gallery: updatedGallery };
        });
      } else {
        console.error('Errore durante l\'upload dell\'immagine: La risposta del server non è come previsto.');
      }
    } catch (error) {
      console.error('Errore durante l\'upload dell\'immagine:', error);
      // Gestisci l'errore in base alle tue esigenze
    }
  };

  const handleRemoveStop = (index) => {
    setFormData((prevData) => {
      const updatedStops = [...prevData.itineraryStops];
      updatedStops.splice(index, 1);
      return { ...prevData, itineraryStops: updatedStops };
    });
  };

  const handleAddService = () => {
    setFormData((prevData) => ({
      ...prevData,
      tourDetails: {
        ...prevData.tourDetails,
        services: [...prevData.tourDetails.services, { service: '', included: false }],
      },
    }));
  };

  const handleRemoveService = (index) => {
    setFormData((prevData) => {
      const updatedServices = [...prevData.tourDetails.services];
      updatedServices.splice(index, 1);
      return {
        ...prevData,
        tourDetails: { ...prevData.tourDetails, services: updatedServices },
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Invia il resto del modulo
      if (initialData) {
        // Stiamo aggiornando, quindi invia l'aggiornamento
        await dispatch(updateExperience({ experienceId: initialData._id, dataToUpdate: formData }));
      } else {
        // Stiamo aggiungendo, quindi invia la creazione
        await dispatch(createExperience(formData));
      }
  
      // Resetta il modulo dopo l'invio
      setFormData({
        name: '',
        type: 'Tour',
        category: 'Cultura',
        gallery: [],
        description: '',
        price: 0,
        location: {
          city: '',
        },
        itineraryStops: [
          {
            day: '',
            stops: [
              {
                name: '',
                description: '',
                location: [{ latitude: '', longitude: '' }],
              },
            ],
          },
        ],
        tourDetails: {
          services: [{ service: '', included: false }],
          meetingPoint: [{ address: '', latitude: '', longitude: '' }],
          people: 0,
          duration: '',
          languages: 'Italiano',
        },
      });
  
    } catch (error) {
      console.error("Errore durante la gestione del modulo:", error);
    }
  };

  return (
      <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="experienceName">
              <Form.Label>Nome dell'esperienza:</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </Form.Group>

          {/* Tipo di esperienza */}
          <Form.Group controlId="experienceType">
              <Form.Label>Tipo di esperienza:</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="Tour">Tour</option>
                  <option value="Itinerario">Itinerario</option>
                  <option value="Pacchetto">Pacchetto</option>
              </Form.Select>
          </Form.Group>

          {/* Categoria dell'esperienza */}
          <Form.Group controlId="experienceCategory">
              <Form.Label>Categoria dell'esperienza:</Form.Label>
              <Form.Select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Cultura">Cultura</option>
                  <option value="Gastronomia">Gastronomia</option>
                  <option value="Natura">Natura</option>
                  <option value="Sport">Sport</option>
              </Form.Select>
          </Form.Group>

          {/* Galleria di immagini */}
          <Form.Group controlId="experienceGallery">
              <Form.Label>Galleria di immagini:</Form.Label>
              <Button type="button" onClick={handleAddImage}>
                  Aggiungi Immagine
              </Button>
              {formData.gallery.map((image, index) => (
                  <div key={index}>
                      <MultiFileInput
                          label={`Immagine ${index + 1}`}
                          onChange={(files) => handleImageUpload(index, files, image?.filenames)} // Usa l'operatore nullish coalescing
                          filenames={image?.filenames ?? []} // Usa l'operatore nullish coalescing
                      />
                      {image?.imageUrl && (
                          <img src={image.imageUrl} alt={`Immagine ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      )}
                  </div>
              ))}
          </Form.Group>



          <Form.Group controlId="experienceDescription">
              <Form.Label>Descrizione dell'esperienza:</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="experiencePrice">
              <Form.Label>Prezzo dell'esperienza:</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="experienceLocation">
              <Form.Label>Località dell'esperienza:</Form.Label>
              <Form.Control
                  type="text"
                  name="location"
                  value={formData.location.city}
                  onChange={(e) =>
                      setFormData((prevData) => ({
                          ...prevData,
                          location: { city: e.target.value },
                      }))
                  }
              />
          </Form.Group>


          {/* Itinerario dell'esperienza */}
          <Form.Group controlId="experienceItinerary">
              <Form.Label>Itinerario dell'esperienza:</Form.Label>
              {formData.itineraryStops.map((stop, index) => (
                  <div key={index}>
                      <Row>
                          <Col>
                              <Form.Label>Giorno:</Form.Label>
                              <Form.Control
                                  type="text"
                                  value={stop.day}
                                  onChange={(e) => handleArrayChange(index, 'itineraryStops', { ...stop, day: e.target.value })}
                              />
                          </Col>
                      </Row>

                      {/* Fermate dell'itinerario */}
                      <Form.Group controlId={`experienceStops-${index}`}>
                          <Form.Label>Fermate:</Form.Label>
                          <Button type="button" onClick={() => handleAddStop(index)}>
                              Aggiungi Fermata
                          </Button>
                          {stop.stops.map((stop, stopIndex) => (
                              <div key={stopIndex}>
                                  <Row>
                                      <Col>
                                          <Form.Label>Nome della fermata:</Form.Label>
                                          <Form.Control
                                              type="text"
                                              value={stop.name}
                                              onChange={(e) =>
                                                  handleArrayChange(index, 'itineraryStops', {
                                                      ...stop,
                                                      name: e.target.value,
                                                  })
                                              }
                                          />
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col>
                                          <Form.Label>Descrizione della fermata:</Form.Label>
                                          <Form.Control
                                              as="textarea"
                                              value={stop.description}
                                              onChange={(e) =>
                                                  handleArrayChange(index, 'itineraryStops', {
                                                      ...stop,
                                                      description: e.target.value,
                                                  })
                                              }
                                          />
                                      </Col>
                                  </Row>

                                  {/* Posizione della fermata */}
                                  <Row>
                                      <Col>
                                          <Form.Label>Posizione della fermata:</Form.Label>
                                          <Form.Control
                                              type="text"
                                              placeholder="Latitudine"
                                              value={stop.location[0].latitude}
                                              onChange={(e) =>
                                                  handleArrayChange(index, 'itineraryStops', {
                                                      ...stop,
                                                      location: [{ ...stop.location[0], latitude: e.target.value }],
                                                  })
                                              }
                                          />
                                      </Col>
                                      <Col>
                                          <Form.Control
                                              type="text"
                                              placeholder="Longitudine"
                                              value={stop.location[0].longitude}
                                              onChange={(e) =>
                                                  handleArrayChange(index, 'itineraryStops', {
                                                      ...stop,
                                                      location: [{ ...stop.location[0], longitude: e.target.value }],
                                                  })
                                              }
                                          />
                                      </Col>
                                  </Row>

                                  <Button type="button" onClick={() => handleRemoveStop(index, stopIndex)}>
                                      Rimuovi Fermata
                                  </Button>
                              </div>
                          ))}
                      </Form.Group>
                  </div>
              ))}
          </Form.Group>


          {/* Dettagli del tour */}
          <Form.Group controlId="experienceTourDetails">
              <Form.Label>Dettagli del tour:</Form.Label>
              <Button type="button" onClick={handleAddService}>
                  Aggiungi Servizio
              </Button>
              {formData.tourDetails.services.map((service, index) => (
                  <div key={index}>
                      <Row>
                          <Col>
                              <Form.Label>Servizio:</Form.Label>
                              <Form.Control
                                  type="text"
                                  value={service.service.type}
                                  onChange={(e) =>
                                      handleArrayChange(index, 'tourDetails', {
                                          ...service,
                                          service: { type: e.target.value },
                                      })
                                  }
                              />
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                              <Form.Label>Incluso:</Form.Label>
                              <Form.Check
                                  type="checkbox"
                                  checked={service.included}
                                  onChange={(e) =>
                                      handleArrayChange(index, 'tourDetails', {
                                          ...service,
                                          included: e.target.checked,
                                      })
                                  }
                              />
                          </Col>
                      </Row>
                      <Button type="button" onClick={() => handleRemoveService(index)}>
                          Rimuovi Servizio
                      </Button>
                  </div>
              ))}

              <Form.Group controlId="experienceMeetingPoint">
                  <Form.Label>Punto di incontro:</Form.Label>
                  {formData.tourDetails.meetingPoint.map((point, index) => (
                      <div key={index}>
                          <Row>
                              <Col>
                                  <Form.Label>Indirizzo:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      value={point.address}
                                      onChange={(e) =>
                                          handleArrayChange(index, 'tourDetails.meetingPoint', {
                                              ...point,
                                              address: e.target.value,
                                          })
                                      }
                                  />
                              </Col>
                              <Col>
                                  <Form.Label>Latitudine:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      value={point.latitude}
                                      onChange={(e) =>
                                          handleArrayChange(index, 'tourDetails.meetingPoint', {
                                              ...point,
                                              latitude: e.target.value,
                                          })
                                      }
                                  />
                              </Col>
                              <Col>
                                  <Form.Label>Longitudine:</Form.Label>
                                  <Form.Control
                                      type="text"
                                      value={point.longitude}
                                      onChange={(e) =>
                                          handleArrayChange(index, 'tourDetails.meetingPoint', {
                                              ...point,
                                              longitude: e.target.value,
                                          })
                                      }
                                  />
                              </Col>
                          </Row>
                      </div>
                  ))}
              </Form.Group>

              <Form.Group controlId="experiencePeople">
                  <Row>
                      <Col>
                          <Form.Label>Numero di partecipanti:</Form.Label>
                          <Form.Control
                              type="number"
                              value={formData.tourDetails.people}
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      tourDetails: { ...prevData.tourDetails, people: parseInt(e.target.value, 10) },
                                  }))
                              }
                          />
                      </Col>
                  </Row>
              </Form.Group>

              <Form.Group controlId="experienceDuration">
                  <Row>
                      <Col>
                          <Form.Label>Durata dell'esperienza:</Form.Label>
                          <Form.Control
                              type="text"
                              value={formData.tourDetails.duration}
                              onChange={(e) =>
                                  setFormData((prevData) => ({
                                      ...prevData,
                                      tourDetails: { ...prevData.tourDetails, duration: e.target.value },
                                  }))
                              }
                          />
                      </Col>
                  </Row>
              </Form.Group>

              <Form.Group controlId="experienceLanguages">
                  <Row>
                      <Col>
                          <Form.Label>Lingue disponibili:</Form.Label>
                          <Form.Select
                              name="languages"
                              value={formData.tourDetails.languages}
                              onChange={handleInputChange}
                          >
                              <option value="Italiano">Italiano</option>
                              <option value="Inglese">Inglese</option>
                              <option value="Spagnolo">Spagnolo</option>
                              <option value="Francese">Francese</option>
                          </Form.Select>
                      </Col>
                  </Row>
              </Form.Group>
              <Form.Group controlId="experienceSupplier">
                  <Row>
                      <Col>
                          <Form.Label>Fornitore:</Form.Label>
                          <Form.Control
                              type="text"
                              name="supplier"
                              value={formData.supplier}
                              onChange={handleInputChange}
                          />
                      </Col>
                  </Row>
              </Form.Group>
          </Form.Group>
          <button type="submit">{initialData ? 'Aggiorna' : 'Aggiungi'}</button>
      </Form>
  );
};

export default ExperienceForm;
