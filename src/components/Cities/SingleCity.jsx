import React, { useRef } from 'react'
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SingleCity({city}) {
    const colRef = useRef(null);

    return (
        <Col
        key={city._id}
        xs={6}
        md={4}
        lg={3}
        xl={2}
        className='mb-3 rounded-4 overflow-hidden single-city-col'
      >
        <Link to={`/city/${city.name}`} className='text-white text-decoration-none'>
          <div className="content position-relative">
            <div className="content-desc position-absolute">
              <h3 className='h5 text-white fw-bold'>{city.name}</h3>
            </div>
            <img src={city.cover} className='img-fluid zoomable-image' alt={city.name} />
          </div>
        </Link>
      </Col>
        
  )
}
