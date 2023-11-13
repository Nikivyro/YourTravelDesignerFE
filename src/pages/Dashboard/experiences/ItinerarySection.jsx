import React from 'react';
import { Button, Col, Form, FormControl } from 'react-bootstrap';

const ItinerarySection = ({ itinerary, handleItineraryChange, addDay, removeDay, addStop, removeStop }) => {
  return (
    <Col xs={12} className='p-3 rounded my-3 bg-light border shadow'>
      {itinerary.map((day, dayIndex) => (
        <div key={dayIndex}>
          <Form.Group className="mb-3" controlId="day">
              <Form.Label>Giorno</Form.Label>
              <FormControl
                type="text"
                value={day.day}
                onChange={(e) => handleItineraryChange(e, dayIndex, null, 'day')}
              />
          </Form.Group>
          <Button variant='danger' type="button" onClick={() => removeDay(dayIndex)}>Delete Day</Button>

          {day.stops.map((stop, stopIndex) => (
            <div key={stopIndex}>
              <Form.Group className="mb-3" controlId={`name-${stopIndex}`}>
                <Form.Label>Name</Form.Label>
                <FormControl
                  type="text"
                  value={stop.name}
                  onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'name')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`description-${stopIndex}`}>
                <Form.Label>Descrizione</Form.Label>
                <FormControl
                  type="text"
                  value={stop.description}
                  onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'description')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`latitude-${stopIndex}`}>
                <Form.Label>Latitude</Form.Label>
                <FormControl
                  type="text"
                  value={stop.latitude}
                  onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'latitude')}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId={`longitude-${stopIndex}`}>
                <Form.Label>Longitude</Form.Label>
                <FormControl
                  type="text"
                  value={stop.longitude}
                  onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'longitude')}
                />
              </Form.Group>
              <Button variant='danger' type="button" onClick={() => removeStop(dayIndex, stopIndex)}>Delete Stop</Button>
            </div>
          ))}

          <Button variant='primary' type="button" onClick={() => addStop(dayIndex)}>Add Stop</Button>
        </div>
      ))}
      <Button variant='success' type="button" onClick={addDay}>Add Day</Button>
    </Col>
  );
};

export default ItinerarySection;
