import React from 'react'
import { Button, Col, Form, FormCheck, FormControl, FormSelect } from 'react-bootstrap';

export default function TourDetailsSection({ formData, handleTourDetailsChange, handleServiceChange, handleServiceCheckboxChange, handleMeetingPointChange }) {
  return (
    <Col xs={12} className='my-3 p-3 border shadow bg-light'>
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
  )
}
