import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './pollution.css';
import 'apexcharts/dist/apexcharts.css';
import Chart from 'react-apexcharts';
import hill1 from './hill1.png';
import hill2 from './hill2.png';
import hill3 from './hill3.png';
import hill4 from './hill4.png';
import hill5 from './hill5.png';
import tree from './tree.png';
import leaf from './leaf.png';
import plant from './plant.png';
export const Pollution = () => {
    
  const [pollution, setPollution] = useState();
  const [aqi, setAqi] = useState();
  const loc = useLocation().state;
  const latitude = loc.lat;
  const longitude = loc.lon;
  const cityName = loc.name;
  const chartOptions = {
    labels: ['CO', 'NO<sub>2</sub>', 'SO<sub>2</sub>', 'O<sub>3</sub>', 'PM<sub>2.5</sub>', 'PM<sub>10</sub>'],
  };
  const fetchData = async () => {
    const pollutionResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=18f41b92768e1f4006d4661cdd7c1c6e`
    );
    if (pollutionResponse.ok) {
      const pollutionData = await pollutionResponse.json();
      setPollution(await pollutionData);
      setAqi(pollutionData?.list[0]?.main?.aqi);
    } else {
      alert('Oops! An error occurred while fetching the pollution data.');
    }
  };

  useEffect(() => {
    fetchData();
  });

  const handleScroll = () => {
    const value = window.scrollY;
    const txt = document.getElementById('text');
    const lf = document.getElementById('leaf');
    const hl1 = document.getElementById('hill1');
    const hl4 = document.getElementById('hill4');
    if (txt) {
        txt.style.marginTop = value * 2.5 + 'px';
    }
    if (lf) {
        lf.style.top = value * -1.5 + 'px';
        lf.style.left = value * 1.5 + 'px';
    }
    if (hl1) {
        hl1.style.top = value * 1 + 'px';
    }
    if (hl4) {
        hl4.style.left = value * -1.5 + 'px';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='main_body'>
      <section className='parallax'>
        <img src={hill1} id='hill1' alt='' />
        <img src={hill2} id='hill2' alt='' />
        <img src={hill3} id='hill3' alt='' />
        <img src={hill4} id='hill4' alt='' />
        <img src={hill5} id='hill5' alt='' />
        <img src={tree} id='tree' alt='' />
        <h2 id='text'>Emission Details</h2>
        <img src={leaf} id='leaf' alt='' />
        <img src={plant} id='plant' alt='' />
      </section>
      <section className='sec'>
        <h2>{cityName}</h2>
        <div className="container minH">
  {pollution && (
    <div>
      <div className="over">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Pollutants</th>
              <th>Concentration(μg/m3)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CO (Carbon monoxide)</td>
              <td>{pollution.list[0].components.co}</td>
            </tr>
            <tr>
              <td>NO<sub>2</sub> (Nitrogen dioxide)</td>
              <td>{pollution.list[0].components.no2}</td>
            </tr>
            <tr>
              <td>SO<sub>2</sub> (Sulphur dioxide)</td>
              <td>{pollution.list[0].components.so2}</td>
            </tr>
            <tr>
              <td>O<sub>3</sub> (Ozone)</td>
              <td>{pollution.list[0].components.o3}</td>
            </tr>
            <tr>
              <td>PM<sub>2.5</sub> (Fine particles matter)</td>
              <td>{pollution.list[0].components.pm2_5}</td>
            </tr>
            <tr>
              <td>PM<sub>10</sub> (Coarse particulate matter)</td>
              <td>{pollution.list[0].components.pm10}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Chart
        className="charts"
          type="pie"
          height={600}
          series={[
            pollution.list[0].components.co,
            pollution.list[0].components.no2,
            pollution.list[0].components.so2,
            pollution.list[0].components.o3,
            pollution.list[0].components.pm2_5,
            pollution.list[0].components.pm10,
          ]}
          options={chartOptions}
        />
      </div>
      <div className="aq">
        {aqi === 1 && <p id="aqgood">AQI of {cityName} is Good.</p>}
        {aqi === 2 && <p id="aqfair">AQI of {cityName} is Fair.</p>}
        {aqi === 3 && <p id="aqmod">AQI of {cityName} is Moderate.</p>}
        {aqi === 4 && <p id="aqpoor">AQI of {cityName} is Poor.</p>}
        {aqi === 5 && <p id="aqvpoor">AQI of {cityName} is Very Poor.</p>}
      </div>
    </div>
  )}
</div>
      </section>
    </div>
  );
};
