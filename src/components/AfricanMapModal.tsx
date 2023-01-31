import React, { useState } from 'react';
import AfricanCountryList from './AfricanCountryList';
import PopupCard from '../utils/PopupModal';

const AfricanMapModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Country</h2>

            <p>Choose a Category for an Immersive Experience</p>
            <ul>
              <li>
                <a href='#'>Link 1</a>
              </li>
              <li>
                <a href='#'>Link 2</a>
              </li>
              <li>
                <a href='#'>Link 3</a>
              </li>
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AfricanMapModal;
