import React, { useState } from 'react';
import AfricanCountryList from './AfricanCountryList';

const AfricanMapModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [flag, setFlag] = useState('');
  const [PopulationSize, setPopulationSize] = useState('');
  const [Quadrant, setQuadrant] = useState('');
  const [capital, setCapital] = useState('');
  const [officialLanguage, setLanguage] = useState('');
  const [currency, setCurrency] = useState('');
  const [ColonizationHistory, setColonizationHistory] = useState('');

  return (
    <>
      <button onClick={() => setShowModal(true)}>More Info</button>
      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Country</h2>

            <div className='order-2 border-solid rounded-md border-primary shadow-lg p-5'>
              <h1 className='font-bold lg:text-4xl' id='name'>
                {countryName}
              </h1>
              <div id='flag' className='text-base-content float-right p-5'>
                <span className='text-9xl'>{flag}</span>
              </div>
              <div id='Quadrent' className='text-base-content'>
                <span>Region : {Quadrant}</span>
              </div>
              <div id='PopulationSize' className='text-base-content'>
                <span>Population Size : {PopulationSize}</span>
              </div>
              <div id='capital' className='text-base-content'>
                <span>Capital City : {capital}</span>
              </div>
              <div id='language' className='text-base-content'>
                <span>Official Language : {officialLanguage}</span>
              </div>
              <div id='currency' className='text-base-content'>
                <span>Currency : {currency} </span>
              </div>

              <div id='' className='text-base-content'>
                <span> : {}</span>
              </div>
            </div>

            <p>Immersive Experience Categories:</p>
            <ul>
              <li>
                <a href='#'>Films</a>
              </li>
              <li>
                <a href='#'>Shorts</a>
              </li>
              <li>
                <a href='#'>Documentaries</a>
              </li>
              <li>
                <a href='#'>Series</a>
              </li>
            </ul>
            <button onClick={() => setShowModal(false)}>Less Info</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AfricanMapModal;
