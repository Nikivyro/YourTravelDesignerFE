import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createExperience } from '../../../reducers/experienceSlice';
import { Button, Col, Form, FormCheck, FormControl, FormSelect } from 'react-bootstrap';

export default function ExperienceForm({cities}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    category: '',
    price: 0,
    location: '',
    gallery: [],
    itineraryStops: [],
    tourDetails: {
      services: [{ service: '', included: false }],
      meetingPoint: { address: '', latitude: '', longitude: '' },
      people: 0,
      duration: '',
      languages: '',
    },
    supplier: ''
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [newStop, setNewStop] = useState({
    day: '',
    stops: [{ name: '', description: '', latitude: '', longitude: '' }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createExperience(formData));
    setFormData({
      name: '',
      description: '',
      type: '',
      category: '',
      price: 0,
      location: '',
      gallery: [],
      itineraryStops: [],
      tourDetails: {
        services: [{ service: '', included: false }],
        meetingPoint: { address: '', latitude: '', longitude: '' },
        people: 0,
        duration: '',
        languages: '',
      },
      supplier: ''
    });
    setImagePreviews([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Mostra anteprima per ogni immagine selezionata
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(imagePreviews);

    // Aggiungi le immagini al formData per l'invio al backend
    setFormData({
      ...formData,
      gallery: [...formData.gallery, ...files],
    });
  };


// Handle di gestione Itinerario
const handleInputChange = (e, index, field) => {
  const { value } = e.target;
  const updatedStops = [...newStop.stops];
  updatedStops[index][field] = value;
  setNewStop({ ...newStop, stops: updatedStops });
};

const handleDayChange = (e) => {
  setNewStop({ ...newStop, day: e.target.value });
};

const addStop = () => {
  setNewStop({
    ...newStop,
    stops: [...newStop.stops, { name: '', description: '', latitude: '', longitude: '' }],
  });
};
const removeStop = (indexToRemove) => {
  const updatedStops = newStop.stops.filter((_, index) => index !== indexToRemove);
  setNewStop({ ...newStop, stops: updatedStops });
};

// Handler gestione servizi
const handleServiceChange = (e, index) => {
  const updatedServices = [...formData.tourDetails.services];
  updatedServices[index][e.target.name] = e.target.value;
  setFormData({
    ...formData,
    tourDetails: {
      ...formData.tourDetails,
      services: updatedServices,
    },
  });
};
const handleServiceCheckboxChange = (e, index) => {
  const updatedServices = [...formData.tourDetails.services];
  updatedServices[index].included = e.target.checked;
  setFormData({
    ...formData,
    tourDetails: {
      ...formData.tourDetails,
      services: updatedServices,
    },
  });
};
const handleMeetingPointChange = (e) => {
  setFormData({
    ...formData,
    tourDetails: {
      ...formData.tourDetails,
      meetingPoint: {
        ...formData.tourDetails.meetingPoint,
        [e.target.name]: e.target.value,
      },
    },
  });
};
const handleTourDetailsChange = (e) => {
  setFormData({
    ...formData,
    tourDetails: {
      ...formData.tourDetails,
      [e.target.name]: e.target.value,
    },
  });
};

  // Handler per l'input del fornitore
  const handleChange = (e) => {
    const value = e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <FormControl
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <FormControl
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="type">
        <Form.Label>Type</Form.Label>
        <FormControl
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <FormControl
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <FormControl
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Location</Form.Label>
        <FormSelect
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Select a City"
        >
          <option value="">Select a City</option>
          {cities.map(city => (
            <option key={city._id} value={city._id}>{city.name}</option>
          ))}
        </FormSelect>
      </Form.Group>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Gallery</Form.Label>
        <Form.Control type="file" name="gallery" onChange={handleImageChange} multiple />
      </Form.Group>
      <Col>
        {imagePreviews.map((preview, index) => (
          <div key={index}>
            <img src={preview} alt={`Image Preview ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>
            <p>{formData.gallery[index].name}</p>
          </div>
        ))}
      </Col>


      <Col>
        <Form.Group className="mb-3" controlId="day">
          <Form.Label>Giorno</Form.Label>
          <FormControl
            type="text"
            value={newStop.day}
            onChange={handleDayChange}
          />
        </Form.Group>

        {newStop.stops.map((stop, index) => (
          <div key={index}>
            <Form.Group className="mb-3" controlId={`name-${index}`}>
              <Form.Label>Name</Form.Label>
              <FormControl
                type="text"
                value={stop.name}
                onChange={(e) => handleInputChange(e, index, 'name')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId={`description-${index}`}>
              <Form.Label>Description</Form.Label>
              <FormControl
                type="text"
                value={stop.description}
                onChange={(e) => handleInputChange(e, index, 'description')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId={`latitude-${index}`}>
              <Form.Label>Latitude</Form.Label>
              <FormControl
                type="text"
                value={stop.latitude}
                onChange={(e) => handleInputChange(e, index, 'latitude')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId={`longitude-${index}`}>
              <Form.Label>Longitude</Form.Label>
              <FormControl
                type="text"
                value={stop.longitude}
                onChange={(e) => handleInputChange(e, index, 'longitude')}
              />
            </Form.Group>

            <Button variant="danger" onClick={() => removeStop(index)}>Delete Stop</Button>
          </div>
        ))}
      </Col>
      <Button variant="success" onClick={addStop}>Add Stop</Button>

      {/* Campi per i dettagli del tour */}
      <Col>

        <Form.Group className="mb-3" controlId="services">
          <Form.Label>Services</Form.Label>
          {formData.tourDetails.services.map((service, index) => (
            <div key={index}>
              <Form.Group className="mb-3">
                <FormControl
                  type="text"
                  name="service"
                  value={service.service}
                  onChange={(e) => handleServiceChange(e, index)}
                />
              </Form.Group>
              <FormCheck
                type="checkbox"
                checked={service.included}
                onChange={(e) => handleServiceCheckboxChange(e, index)}
                label="Included"
              />
            </div>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="meetingPointAddress">
          <Form.Label>Meeting Point Address</Form.Label>
          <FormControl
            type="text"
            name="address"
            value={formData.tourDetails.meetingPoint.address}
            onChange={handleMeetingPointChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="meetingPointLatitude">
          <Form.Label>Meeting Point Latitude</Form.Label>
          <FormControl
            type="text"
            name="latitude"
            value={formData.tourDetails.meetingPoint.latitude}
            onChange={handleMeetingPointChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="meetingPointLongitude">
          <Form.Label>Meeting Point Longitude</Form.Label>
          <FormControl
            type="text"
            name="longitude"
            value={formData.tourDetails.meetingPoint.longitude}
            onChange={handleMeetingPointChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="numberOfPeople">
          <Form.Label>Number of People</Form.Label>
          <FormControl
            type="number"
            name="people"
            value={formData.tourDetails.people}
            onChange={handleMeetingPointChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="duration">
          <Form.Label>Duration</Form.Label>
          <FormControl
            type="text"
            name="duration"
            value={formData.tourDetails.duration}
            onChange={handleTourDetailsChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="languages">
          <Form.Label>Languages</Form.Label>
          <Form.Select
            name="languages"
            value={formData.tourDetails.languages}
            onChange={handleTourDetailsChange}
          >
            <option value="Italiano">Italiano</option>
            <option value="Inglese">Inglese</option>
            <option value="Spagnolo">Spagnolo</option>
            <option value="Francese">Francese</option>
          </Form.Select>
        </Form.Group>

      </Col>

      <Form.Group className="mb-3" controlId="supplier">
        <Form.Label>Supplier</Form.Label>
        <FormControl
          type="text"
          name="supplier"
          value={formData.supplier}
          onChange={handleInputChange}
          placeholder="Inserisci l'ID del fornitore"
        />
      </Form.Group>

      <Button variant='success' type="submit">Create Experience</Button>
    </Form>
  )
}
