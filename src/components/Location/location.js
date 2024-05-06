import React, { useState, useEffect } from 'react';
import countryData from './tbl_country.json';
import stateData from './tbl_state.json';
import cityData from './tbl_city.json';
import './location.css';
import { useNavigate } from 'react-router-dom';
export const Location = (props) => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  useEffect(() => {
    setCountry(countryData);
  }, []);
  const navigate= useNavigate();
  const handleSubmit = async(event) =>{
    event.preventDefault();
  const countryId = event.target.elements.country.value;
  const stateId = event.target.elements.state.value;
  const cityId = event.target.elements.city.value;
  const countryName = countryData.find((country) => country.country_id === countryId)?.country_name;
  const stateName = stateData.find((state) => state.state_id === stateId)?.state_name;
  const cityName = cityData.find((city) => city.city_id === cityId)?.city_name;
    const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateName},${countryName}&limit=5&appid=18f41b92768e1f4006d4661cdd7c1c6e`);
    const [locationData] = await locationResponse.json();
    if (locationData) {
      navigate('/pollution', {state: locationData});
    } else {
      alert("Invalid Location");
    }
  };
  const handleCountry = (event) => {
    const selectedCountryId = event.target.value;
    const selectedCountryStates = stateData.filter((state) => state.country_id === selectedCountryId);
    setState(selectedCountryStates);
    document.getElementById('state-select').selectedIndex=0;
    document.getElementById('city-select').selectedIndex=0;
  };
  const handleState = (event) => {
    const selectedStateId = event.target.value;
    const selectedStateCities = cityData.filter((cityItem) => cityItem.state_id === selectedStateId);
    document.getElementById('city-select').selectedIndex=0;
    setCity(selectedStateCities);
  };
  return(
    <>
      <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='country'>Country</label>
            <select
              className='form-select form-select-sm'
              aria-label='.form-select-sm example'
              name='country'
              onChange={handleCountry}
            >
              <option value=''>Select Your Country</option>
              {country.map((country, index) => (
                <option key={index} value={country.country_id}>
                  {country.country_name}
                </option>
              ))}
            </select>

            <label htmlFor='state'>State</label>
            <select
              className='form-select form-select-sm'
              aria-label='.form-select-sm example'
              name='state'
              id='state-select'
              onChange={handleState}>
              <option value=''>Select Your State</option>
              {state.map((state, index) => (
                <option key={index} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </select>
            <label htmlFor='city'>City</label>
            <select className='form-select form-select-sm' aria-label='.form-select-sm example' name='city' id='city-select'>
              <option value=''>Select Your City</option>
              {city.map((getcity, index) => (
                <option key={index} value={getcity.city_id}>
                  {getcity.city_name}
                </option>
              ))}
            </select>
            
            <div className="modal-footer">
              <input type='submit' value='Submit' className="btn btn-primary" data-bs-dismiss="modal"/>
            </div>
          </form>
          
      </div>
    </>
  );
};
