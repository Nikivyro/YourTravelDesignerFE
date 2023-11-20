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
        <Card.Title className='fw-bold h6'>{data.name}</Card.Title>
        <Card.Text>
          <ul className='list-unstyled'>
            <li>
              <span>{data.type} - {data.category}</span>
            </li>
            <li>
              <span><i className="bi bi-geo-alt me-1"></i>{data.location.city.name}</span>
            </li>
            <li>
              <span className='fw-bold'>{data.tourDetails.duration}</span>
            </li>
          </ul>
          {/* <p>{data.description}</p> */}
          <hr></hr>
          <span>€ {data.price} / a persona</span>
        </Card.Text>
        <Link to={`/experiences/${data._id}`} className='text-white text-decoration-none'>
          <Button variant="warning">Scopri di più<i className="bi bi-arrow-right ms-1"></i></Button>
        </Link>
      </Card.Body>
    </Card>
    );
}
