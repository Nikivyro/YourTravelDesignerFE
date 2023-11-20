// BackOffice.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Button } from 'react-bootstrap';
import CityTable from './citites/CityTable';
import CityForm from './citites/CityForm';
import CountryTable from './countries/CountryTable';
import CountryForm from './countries/CountryForm';
import ExperienceTable from './experiences/ExperienceTable';
import { fetchCities } from '../../api/cityApi';
import { fetchCountries } from '../../api/countryApi';
import CreateExperienceForm from './experiences/CreateExperience';
import EditExperienceForm from './experiences/EditExperienceForm';
import { fetchExperiences, updateExperience } from '../../reducers/experienceSlice';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Layout/Layout';

export default function BackOffice() {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const experiences = useSelector((state) => state.experiences.data);

  useEffect(() => {
    loadCities();
    loadCountries();
    dispatch(fetchExperiences());
  }, []);

  const loadCities = async () => {
    try {
      const citiesData = await fetchCities();
      setCities(citiesData);
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  };

  const loadCountries = async () => {
    try {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

  const handleCityAdded = (newCity) => {
    setCities([...cities, newCity]);
  };

  const handleCityUpdated = (updatedCity) => {
    const updatedCities = cities.map((city) => (city._id === updatedCity._id ? updatedCity : city));
    setCities(updatedCities);
  };

  const handleCityDeleted = (deletedCityId) => {
    const updatedCities = cities.filter((city) => city._id !== deletedCityId);
    setCities(updatedCities);
  };

  const handleCountryAdded = (newCountry) => {
    setCountries([...countries, newCountry]);
  };

  const handleCountryUpdated = (updatedCountry) => {
    const updatedCountries = countries.map((country) => (country._id === updatedCountry._id ? updatedCountry : country));
    setCountries(updatedCountries);
  };

  const handleCountryDeleted = (deletedCountryId) => {
    const updatedCountries = countries.filter((country) => country._id !== deletedCountryId);
    setCountries(updatedCountries);
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <Layout>
      <Container fluid className='py-5'>
        <Row>
          <Col xs={12}>
            <h1>BackOffice</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Tab.Container id="backoffice-tabs" defaultActiveKey="cities">
              <Row>
                <Col xs={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="cities">Città</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="countries">Paesi</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="experiences">Experiences</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col xs={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="cities">
                      <CityForm onCityAdded={handleCityAdded} countries={countries} />
                      <CityTable cities={cities} onCityDeleted={handleCityDeleted} onCityUpdated={handleCityUpdated} countries={countries} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="countries">
                      <CountryForm onCountryAdded={handleCountryAdded} />
                      <CountryTable countries={countries} onCountryDeleted={handleCountryDeleted} onCountryUpdated={handleCountryUpdated} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="experiences">
                      <Button onClick={handleToggleCreateForm} className='mb-4'>
                        {showCreateForm ? 'Chiudi il form' : 'Crea una nuova esperienza'}
                      </Button>
                      {showCreateForm && <CreateExperienceForm cities={cities} />}
                      <ExperienceTable experiences={experiences} cities={cities}/>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}