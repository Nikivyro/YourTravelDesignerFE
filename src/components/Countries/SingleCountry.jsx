import React, { useRef } from 'react'
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SingleCountry({country}) {
    const colRef = useRef(null);

    return (
        <Col key={country._id} xs={6} lg={4}>
            <h4>{country.name}</h4>
            {/* <Link to={`/country/${country.name}`} className='text-white text-decoration-none'>
                <Button variant="warning">Scopri di più<i className="bi bi-arrow-right ms-1"></i></Button>
            </Link> */}
        </Col>
        
  )
}
