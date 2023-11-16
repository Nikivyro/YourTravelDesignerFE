import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function SingleExperience({ data }) {

  const colRef = useRef(null);

  return (
    <Card ref={colRef}>
      <Card.Img variant="top" src={data.cover} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          <p>Type: {data.type}</p>
          <p>Category: {data.category}</p>
        </Card.Text>
        <Card.Text>
          {data.description}
          <hr></hr>
          € {data.price}
        </Card.Text>
        <Card.Text>
          <p>City: {data.location.city.name}</p>
          <p>Duration: {data.tourDetails.duration}</p>
          <p>Languages: {data.tourDetails.languages}</p>
          <p>People: {data.tourDetails.people}</p>
        </Card.Text>
        <Link to={`/experiences/${data._id}`} className='text-white text-decoration-none'>
          <Button variant="warning">Scopri di più<i className="bi bi-arrow-right ms-1"></i></Button>
        </Link>
      </Card.Body>
    </Card>
    );
}
