import React from 'react';
import './main_page.css';
import { Location } from '../Location/location';
import { Link } from 'react-router-dom';
const MainPage = () => {
  return (
    <div>
      <div className="bgImage"></div>
      <div className="content">
        <div className='content-inner'>
          <h2>Know Your City</h2>
          <p>Understand Nature, Save Nature...</p>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#locationModal">
            Get Started
          </button>
        </div>
        <div className="modal fade" id="locationModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">Please fill your location details</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Location />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MainPage };
