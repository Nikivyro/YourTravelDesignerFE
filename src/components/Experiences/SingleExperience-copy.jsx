import React from 'react'

export default function SingleExperience({ data }) {


    return (
        <div className='border mb-4 bg-light'>
          <h2>{data.name}</h2>
          <p>Type: {data.type}</p>
          <p>Category: {data.category}</p>
          <p>Description: {data.description}</p>
          <p>Price: {data.price} EUR</p>
    
          <h3>Location:</h3>
          <p>City: {data.location.city.name}</p>
          {/* <p>City: {data.location.city.county}</p> */}
    
          <h3>Tour Details:</h3>
          <p>Duration: {data.tourDetails.duration}</p>
          <p>Languages: {data.tourDetails.languages}</p>
          <p>People: {data.tourDetails.people}</p>
    
          <h3>Services:</h3>
          <ul>
            {data.tourDetails.services.map((service) => (
              <li key={service._id}>
                {service.service} - {service.included ? 'Included' : 'Not Included'}
              </li>
            ))}
          </ul>
    
          <h3>Meeting Point:</h3>
          <p>Address: {data.tourDetails.meetingPoint[0].address}</p>
          <p>Latitude: {data.tourDetails.meetingPoint[0].latitude}</p>
          <p>Longitude: {data.tourDetails.meetingPoint[0].longitude}</p>
    
          <h3>Gallery:</h3>
          <ul>
            {data.gallery.map((image) => (
              <li key={image._id}>
                <img src={image.imageUrl} alt={image.filename} />
              </li>
            ))}
          </ul>
    
          <h3>Itinerary Stops:</h3>
          {data.itineraryStops.map((stop) => (
            <div key={stop._id}>
              <h4>{stop.day}</h4>
              <ul>
                {stop.stops.map((tourStop) => (
                  <li key={tourStop._id}>
                    <p>Name: {tourStop.name}</p>
                    <p>Description: {tourStop.description}</p>
                    <p>Location: {tourStop.location[0].latitude}, {tourStop.location[0].longitude}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
}
