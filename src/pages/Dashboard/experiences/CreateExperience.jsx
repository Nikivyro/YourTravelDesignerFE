import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExperience, uploadCover, selectCoverURL } from '../../../reducers/experienceSlice';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';

const CreateExperience = ({ cities }) => {
    const dispatch = useDispatch();
    const coverURL = useSelector(selectCoverURL);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        category: '',
        cover: null,
        description: '',
        price: 0,
        location: {
            city: ''
        },
        itineraryStops: [
            {
                day: '',
                stops: [
                    {
                        name: '',
                        description: '',
                        location: {
                            latitude: '',
                            longitude: ''
                        }
                    }
                ]
            }
        ],
        tourDetails: {
            services: [
                {
                    service: '',
                    included: false
                }
            ],
            meetingPoint: [],
            people: 0,
            duration: '',
            languages: ''
        },
        supplier: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'price' ? parseInt(value) : value;
        setFormData({
            ...formData,
            [name]: updatedValue
        });
    };

    const handleLocationChange = (e) => {
        const selectedCityId = e.target.value;
    
        setFormData({
            ...formData,
            location: {
                city: selectedCityId
            }
        });
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        setFormData({
          ...formData,
          cover: file,
        });
    
        if (file) {
          dispatch(uploadCover(file));
        }
      };

      const handleItineraryChange = (e, dayIndex, stopIndex, locationKey) => {
        const { name, value } = e.target;
        const updatedStops = [...formData.itineraryStops];
      
        if (name === 'day') {
          updatedStops[dayIndex][name] = value;
        } else {
          // Verifica se la proprietà location esiste
          if (locationKey) {
            updatedStops[dayIndex].stops[stopIndex].location[locationKey] = value;
          } else {
            updatedStops[dayIndex].stops[stopIndex][name] = value;
          }
        }
      
        setFormData({
          ...formData,
          itineraryStops: updatedStops
        });
      };
    const handleAddStop = (dayIndex) => {
        const updatedItinerary = [...formData.itineraryStops];
      
        // Verifica se l'array stops esiste
        if (updatedItinerary[dayIndex] && updatedItinerary[dayIndex].stops) {
          updatedItinerary[dayIndex].stops.push({
            name: '',
            description: '',
            location: {
              latitude: '',
              longitude: ''
            }
          });
        } else {
          updatedItinerary[dayIndex] = { stops: [{ name: '', description: '', location: { latitude: '', longitude: '' } }] };
        }
      
        setFormData({
          ...formData,
          itineraryStops: updatedItinerary
        });
      };

    const handleRemoveStop = (dayIndex, stopIndex) => {
        const updatedItinerary = [...formData.itineraryStops];
        updatedItinerary[dayIndex].stops.splice(stopIndex, 1);

        setFormData({
            ...formData,
            itineraryStops: updatedItinerary
        });
    };

    const handleAddDay = () => {
        const updatedItinerary = [...formData.itineraryStops];
      
        updatedItinerary.push({
          day: '',
          stops: [
            {
              name: '',
              description: '',
              location: {
                latitude: '',
                longitude: ''
              }
            }
          ]
        });
      
        setFormData({
          ...formData,
          itineraryStops: updatedItinerary
        });
      };

    const handleRemoveDay = (dayIndex) => {
        const updatedItinerary = [...formData.itineraryStops];
        updatedItinerary.splice(dayIndex, 1);

        setFormData({
            ...formData,
            itineraryStops: updatedItinerary
        });
    };


    const handleRemoveService = (index) => {
        const updatedServices = formData.tourDetails.services.filter((service, i) => i !== index);

        setFormData({
            ...formData,
            tourDetails: {
                ...formData.tourDetails,
                services: updatedServices,
            },
        });
    };

    const handleAddService = () => {
        const newService = { service: '', included: false };
        const updatedServices = [...formData.tourDetails.services, newService];

        setFormData({
            ...formData,
            tourDetails: {
                ...formData.tourDetails,
                services: updatedServices,
            },
        });
    };

    const handleTourDetailChange = (e, field, index) => {
        const { value, checked, type } = e.target;
        const updatedServices = [...formData.tourDetails.services];

        if (type === 'checkbox') {
            updatedServices[index].included = checked;
        } else {
            updatedServices[index].service = value;
        }

        setFormData({
            ...formData,
            tourDetails: {
                ...formData.tourDetails,
                services: updatedServices,
            },
        });
    };

    const handleMeetingPointChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMeetingPoints = [...formData.tourDetails.meetingPoint];
        updatedMeetingPoints[index][name] = value;

        setFormData({
            ...formData,
            tourDetails: {
                ...formData.tourDetails,
                meetingPoint: updatedMeetingPoints,
            },
        });
    };

    const handleAddMeetingPoint = () => {
        setFormData({
            ...formData,
            tourDetails: {
                ...formData.tourDetails,
                meetingPoint: [
                    ...formData.tourDetails.meetingPoint,
                    { address: '', latitude: '', longitude: '' },
                ],
            },
        });
    };

    const handleRemoveMeetingPoint = (index) => {
        const updatedMeetingPoints = formData.tourDetails.meetingPoint.filter(
            (_, i) => i !== index
        );

        setFormData({
            ...formData,
            tourDetails: {
                ...formData.tourDetails,
                meetingPoint: updatedMeetingPoints,
            },
        });
    };

    const handleTourDetailsChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'people' ? parseInt(value, 10) : value;
        setFormData({
          ...formData,
          tourDetails: {
            ...formData.tourDetails,
            [name]: parsedValue
          }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await dispatch(createExperience(formData));
        } catch (error) {
            console.error('Errore nella creazione', error)
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='my-5'>
          <Form.Group className="mb-3" controlId="formBasicCityName">
            <Form.Label className='fw-bold mb-2'>Nome Esperienza</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange}  required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicType">
            <Form.Label className='fw-bold mb-2'>Tipologia</Form.Label>
            <Form.Control as="select" name="type" value={formData.type} onChange={handleInputChange} required>
                <option value="" disabled>Seleziona tipologia</option>
                <option value="Tour">Tour</option>
                <option value="Itinerario">Itinerario</option>
                <option value="Pacchetto">Pacchetto</option>
            </Form.Control>
          </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicCategory">
                <Form.Label className='fw-bold mb-2'>Categoria</Form.Label>
                <Form.Control as="select" name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="" disabled>Seleziona categoria</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Gastronomia">Gastronomia</option>
                    <option value="Natura">Natura</option>
                    <option value="Sport">Sport</option>
                </Form.Control>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicDescription">
                    <Form.Label className='fw-bold mb-2'>Descrizione</Form.Label>
                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicPrice">
                <Form.Label className='fw-bold mb-2'>Prezzo</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicLocation">
                <Form.Label className='fw-bold mb-2'>Città</Form.Label>
                <Form.Control as="select" name="location" value={formData.location.city} onChange={handleLocationChange} required>
                    <option value="" disabled>Seleziona Location</option>
                    {cities.map(city => (
                    <option key={city._id} value={city._id}>
                        {city.name}
                    </option>
                    ))}
                </Form.Control>
                </Form.Group>
            </Row>


            {formData.itineraryStops.map((day, dayIndex) => (
            <Row key={dayIndex} className='border rounded-2 bg-light my-4'>
                <Col xs={12} className='p-3'>
                    <h3>Itinerario</h3>
                    <p>Descrizione dell'Itinerario, specificare giorni e descrizione delle varie fermate dell'esperienza.</p>
                </Col>
                <Col md={4} className="mb-3 p-3">
                    <Form.Group controlId={`formBasicNameDay-${dayIndex}`}>
                        <Form.Label className='fw-bold mb-2'>Giorno</Form.Label>
                        <Form.Control type="text" name="day" value={day.day} onChange={(e) => handleItineraryChange(e, dayIndex)} />
                    </Form.Group>
                </Col>
                {day.stops.map((stop, stopIndex) => (
                <Col xs={12} key={stopIndex}>
                    <div className="content-stops border shadow p-3 m-3">
                    <Form.Group controlId={`formBasicNameStop-${dayIndex}-${stopIndex}`}>
                        <Form.Label className='fw-bold mb-2'>Fermata</Form.Label>
                        <Form.Control type="text" name="name" value={stop.name} onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex)} />
                    </Form.Group>
                    <Form.Group controlId={`formBasicDescriptionStop-${dayIndex}-${stopIndex}`}>
                        <Form.Label className='fw-bold mb-2'>Descrizione</Form.Label>
                        <Form.Control as="textarea" name="description" value={stop.description} onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex)} />
                    </Form.Group>
                    <Form.Group controlId={`formBasicLatitudeStop-${dayIndex}-${stopIndex}`}>
                        <Form.Label className='fw-bold mb-2'>Latitudine</Form.Label>
                        <Form.Control type="text" name="latitude" value={stop.location.latitude} onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'latitude')} />
                    </Form.Group>
                    <Form.Group controlId={`formBasicLongitudeStop-${dayIndex}-${stopIndex}`}>
                        <Form.Label className='fw-bold mb-2'>Longitudine</Form.Label>
                        <Form.Control type="text" name="longitude" value={stop.location.longitude} onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'longitude')} />
                    </Form.Group>
                    <Button variant='danger' className='mt-3' type="button" onClick={() => handleRemoveStop(dayIndex, stopIndex)}>
                        Rimuovi Stop
                    </Button>
                    </div>
                </Col>
                ))}
                <Col md={4} className='ms-auto text-end my-3'>
                <Button variant='success' className='me-2' type="button" onClick={() => handleAddStop(dayIndex)}>Aggiungi Stop</Button>
                <Button variant='danger' type="button" onClick={() => handleRemoveDay(dayIndex)}>Rimuovi Giorno</Button>
                </Col>
            </Row>
            ))}
            <Row className='text-end mt-3 mb-4'>
                <Col>
                    <Button variant='primary' type="button" onClick={handleAddDay}>Aggiungi Giorno</Button>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <h3>Servizi inclusi</h3>
                    <p>Specificare i servizi inclusi nell'esperienza</p>
                </Col>
            </Row>
            {formData.tourDetails.services.map((service, index) => (
                <Row key={index}>
                    <Form.Group as={Col} controlId={`formBasicService-${index}`}>
                        <Form.Label className='fw-bold mb-2'>Servizio</Form.Label>
                        <Form.Control
                            type="text"
                            value={service.service}
                            onChange={(e) => handleTourDetailChange(e, 'services', index)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId={`formBasicIncluded-${index}`}>
                        <Form.Check
                            type="checkbox"
                            label="Incluso"
                            checked={service.included}
                            onChange={(e) => handleTourDetailChange(e, 'included', index)}
                        />
                    </Form.Group>
                    <Col className='text-start me-auto'>
                        <Button variant='danger' type="button" onClick={() => handleRemoveService(index)}>
                            Rimuovi
                        </Button>
                    </Col>
                </Row>
            ))}
            <Row className='text-start mb-5 mt-3'>
                <Col>
                    <Button variant='success' type="button" onClick={handleAddService}>Aggiungi servizio</Button>
                </Col>
            </Row>


            {formData.tourDetails.meetingPoint.map((point, index) => (
                <Row key={index}>
                    <Form.Group as={Col} controlId={`formBasicMeetingPoint-${index}`}>
                        <Form.Label className='fw-bold mb-2'>Indirizzo</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={point.address}
                            onChange={(e) => handleMeetingPointChange(e, index)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId={`formBasicMeetingPointLat-${index}`}>
                        <Form.Label className='fw-bold mb-2'>Latitudine</Form.Label>
                        <Form.Control
                            type="text"
                            name="latitude"
                            value={point.latitude}
                            onChange={(e) => handleMeetingPointChange(e, index)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId={`formBasicMeetingPointLong-${index}`}>
                        <Form.Label className='fw-bold mb-2'>Longitudine</Form.Label>
                        <Form.Control
                            type="text"
                            name="longitude"
                            value={point.longitude}
                            onChange={(e) => handleMeetingPointChange(e, index)}
                        />
                    </Form.Group>
                    {index !== 0 && (
                    <Col className='text-end align-self-center'>
                        <Button variant='danger' type="button" onClick={() => handleRemoveMeetingPoint(index)}>
                            Rimuovi Luogo di Incontro
                        </Button>
                    </Col>
                    )}
                </Row>
            ))}
            <Button type="button" onClick={handleAddMeetingPoint}>Aggiungi Luogo di Incontro</Button>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicPeople">
                <Form.Label className='fw-bold mb-2'>People</Form.Label>
                <Form.Control type="number" name="people" value={formData.tourDetails.people} onChange={handleTourDetailsChange} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicDuration">
                <Form.Label className='fw-bold mb-2'>Duration</Form.Label>
                <Form.Control type="text" name="duration" value={formData.tourDetails.duration} onChange={handleTourDetailsChange} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicLanguages">
                <Form.Label className='fw-bold mb-2'>Languages</Form.Label>
                <Form.Control as="select" name="languages" value={formData.tourDetails.languages} onChange={handleTourDetailsChange} required>
                    <option value="" disabled>Select Language</option>
                    <option value="Italiano">Italiano</option>
                    <option value="Inglese">Inglese</option>
                    <option value="Spagnolo">Spagnolo</option>
                    <option value="Francese">Francese</option>
                </Form.Control>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicSupplier">
                <Form.Label className='fw-bold mb-2'>Supplier</Form.Label>
                <Form.Control type="text" name="supplier" value={formData.supplier} onChange={handleInputChange} required/>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formBasicCover">
                <Form.Label className='fw-bold mb-2'>Cover Image</Form.Label>
                <Form.Control type="file" onChange={handleCoverChange} required/>
                {coverURL && <img src={coverURL} alt="Cover Preview" />}
                </Form.Group>
            </Row>

            <Button type="submit">Crea Esperienza</Button>
        </Form>
    );
};

export default CreateExperience;
