import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExperience, uploadCover, selectCoverURL } from '../../../reducers/experienceSlice';
import Button from 'react-bootstrap/Button';

const EditExperienceForm = ({ experienceData, cities, onSave }) => {
  const dispatch = useDispatch();
  const coverURL = useSelector(selectCoverURL);
  const [formData, setFormData] = useState(experienceData);

  useEffect(() => {
    setFormData(experienceData);
  }, [experienceData]);

const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'price' ? parseInt(value) : value;

    // Se il campo è 'supplier', estrai solo l'_id
    const updatedSupplierValue = name === 'supplier' && typeof updatedValue === 'object' && updatedValue !== null
        ? updatedValue._id
        : updatedValue;

    setFormData({
        ...formData,
        [name]: updatedSupplierValue
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

// const handleCoverChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       cover: file,
//     });

//     if (file) {
//       dispatch(uploadCover(file));
//     }
// };
const handleCoverChange = (e) => {
    const file = e.target.files[0];

    setFormData({
        ...formData,
        cover: file,
    });

    if (file) {
        dispatch(uploadCover(file))
            .then((action) => {
                const coverURL = action.payload;
                console.log('URL dell\'immagine:', coverURL);

                // Aggiorna lo stato con l'URL della copertina
                setFormData((prevData) => ({
                    ...prevData,
                    cover: coverURL,
                }));
            })
            .catch((error) => {
                // Gestisci eventuali errori nell'upload della copertina
                console.error('Errore durante l\'upload della copertina:', error);
            });
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
    setFormData((prevData) => {
        const updatedItinerary = [...prevData.itineraryStops];

        if (updatedItinerary[dayIndex] && updatedItinerary[dayIndex].stops) {
            updatedItinerary[dayIndex] = {
                ...updatedItinerary[dayIndex],
                stops: [
                    ...updatedItinerary[dayIndex].stops,
                    {
                        name: '',
                        description: '',
                        location: {
                            latitude: '',
                            longitude: ''
                        }
                    }
                ]
            };
        } else {
            updatedItinerary[dayIndex] = {
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
            };
        }

        return {
            ...prevData,
            itineraryStops: updatedItinerary
        };
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
        updatedServices[index] = {
            ...updatedServices[index],
            included: checked,
        };
    } else {
        updatedServices[index] = {
            ...updatedServices[index],
            service: value,
        };
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
      await dispatch(updateExperience({ experienceId: formData._id, dataToUpdate: formData }));
    } catch (error) {
      // Gestione errori
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
    </label>

    <label>
        Type:
        <select name="type" value={formData.type} onChange={handleInputChange}>
            <option value="">Select Type</option>
            <option value="Tour">Tour</option>
            <option value="Itinerario">Itinerario</option>
            <option value="Pacchetto">Pacchetto</option>
        </select>
    </label>

    <label>
        Category:
        <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            <option value="Cultura">Cultura</option>
            <option value="Gastronomia">Gastronomia</option>
            <option value="Natura">Natura</option>
            <option value="Sport">Sport</option>
        </select>
    </label>

    <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
    </label>

    <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
    </label>

    <label>
        Location:
        <select name="location" value={formData.location.city._id} onChange={handleLocationChange}>
            <option value="">Select Location</option>
            {cities.map(city => (
                <option key={city._id} value={city._id}>
                    {city.name}
                </option>
            ))}
        </select>
    </label>


    {formData.itineraryStops.map((day, dayIndex) => (
        <div key={dayIndex}>
            <label>
                Day:
                <input
                    type="text"
                    name="day"
                    value={day.day}
                    onChange={(e) => handleItineraryChange(e, dayIndex)}
                />
            </label>
            {day.stops.map((stop, stopIndex) => (
                <div key={stopIndex}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={stop.name}
                            onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex)}
                        />
                    </label>
                    <label>
                        description:
                        <input
                            type="text"
                            name="description"
                            value={stop.description}
                            onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex)}
                        />
                    </label>
                    <label>
                        latitude:
                        <input
                            type="text"
                            name="latitude"
                            value={stop.location.latitude}
                            onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'latitude')}
                        />
                    </label>
                    <label>
                        longitude:
                        <input
                            type="text"
                            name="longitude"
                            value={stop.location.longitude}
                            onChange={(e) => handleItineraryChange(e, dayIndex, stopIndex, 'longitude')}
                        />
                    </label>
                    <button type="button" onClick={() => handleRemoveStop(dayIndex, stopIndex)}>
                        Rimuovi Stop
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => handleAddStop(dayIndex)}>Aggiungi Stop</button>
            <button type="button" onClick={() => handleRemoveDay(dayIndex)}>Rimuovi Giorno</button>
        </div>
    ))}
    <button type="button" onClick={handleAddDay}>Aggiungi Giorno</button>


    {formData.tourDetails.services.map((service, index) => (
        <div key={index}>
            <label>
                Service:
                <input
                    type="text"
                    value={service.service}
                    onChange={(e) => handleTourDetailChange(e, 'services', index)}
                />
            </label>
            <label>
                Included:
                <input
                    type="checkbox"
                    checked={service.included}
                    onChange={(e) => handleTourDetailChange(e, 'included', index)}
                />
            </label>
            <button type="button" onClick={() => handleRemoveService(index)}>
                Remove Service
            </button>
        </div>
    ))}
    <button type="button" onClick={handleAddService}>Add Service</button>


    {formData.tourDetails.meetingPoint.map((point, index) => (
        <div key={index}>
            <label>
                Address:
                <input
                    type="text"
                    name="address"
                    value={point.address}
                    onChange={(e) => handleMeetingPointChange(e, index)}
                />
            </label>
            <label>
                Latitude:
                <input
                    type="text"
                    name="latitude"
                    value={point.latitude}
                    onChange={(e) => handleMeetingPointChange(e, index)}
                />
            </label>
            <label>
                Longitude:
                <input
                    type="text"
                    name="longitude"
                    value={point.longitude}
                    onChange={(e) => handleMeetingPointChange(e, index)}
                />
            </label>
            {index !== 0 && (
                <button type="button" onClick={() => handleRemoveMeetingPoint(index)}>
                    Rimuovi Luogo di Incontro
                </button>
            )}
        </div>
    ))}
    <button type="button" onClick={handleAddMeetingPoint}>Aggiungi Luogo di Incontro</button>

    <label>
        People:
        <input
            type="number"
            name="people"
            value={formData.tourDetails.people}
            onChange={handleTourDetailsChange}
        />
    </label>

    <label>
        Duration:
        <input
            type="text"
            name="duration"
            value={formData.tourDetails.duration}
            onChange={handleTourDetailsChange}
        />
    </label>

    <label>
        Languages:
        <select name="languages" value={formData.tourDetails.languages} onChange={handleTourDetailsChange}>
            <option value="">Select Language</option>
            <option value="Italiano">Italiano</option>
            <option value="Inglese">Inglese</option>
            <option value="Spagnolo">Spagnolo</option>
            <option value="Francese">Francese</option>
        </select>
    </label>

    <label>
    Supplier:
    <input
        type="text"
        name="supplier"
        value={typeof formData.supplier === 'object' ? formData.supplier._id : formData.supplier}
        onChange={handleInputChange}
    />
    </label>

    <input type="file" onChange={handleCoverChange} />
    {formData.cover && <img src={formData.cover} alt="Cover Preview" className='img-fluid' width={200}/>}

    <button type="submit">Salva modifiche</button>
</form>
  );
};

export default EditExperienceForm;
