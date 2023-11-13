import React from 'react';
import { Col, Form } from 'react-bootstrap';

const ImageSection = ({ formData, handleImageChange, imagePreviews }) => {
  return (
    <Col xs={12} className='bg-light my-3 p-3 border'>
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
    </Col>
  );
};

export default ImageSection;
