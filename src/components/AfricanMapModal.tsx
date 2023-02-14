import React, { useState } from 'react';
import AfricanCountryList from './AfricanCountryList';

interface AfricanMapModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry: string;
}
const AfricanMapModal = (props: AfricanMapModalProps) => {
  const setShowModal = props.setShowModal;
  console.log(AfricanCountryList[props?.selectedCountry?.toUpperCase()]);
  const {
    CountryName,
    Quadrant,
    Flag,
    PopulationSize,
    Capital,
    OfficialLanguage: OfficialLanguage,
    Currency,
  } = AfricanCountryList[props.selectedCountry.toUpperCase()];
  return (
    <div
      className='modal-overlay z-50'
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className='modal-content bg-primary text-lg p-5 rounded-lg bg-opacity-80'>
        <div className='order-2 border-solid rounded-md border-primary bg-primary-focus bg-opacity-80 shadow-lg p-5 w-96'>
          <h1 className='font-bold lg:text-4xl' id='name'>
            {CountryName}
          </h1>
          <div id='flag' className='text-base-content float-right p-5'>
            <img src={Flag} className='text-sm'></img>
          </div>
          <div id='Quadrent' className='text-base-content'>
            Region : <span className='font-bold'>{Quadrant}</span>
          </div>
          <div id='PopulationSize' className='text-base-content'>
            Population Size :{' '}
            <span className='font-bold'>{PopulationSize.toLocaleString()}</span>
          </div>
          <div id='capital' className='text-base-content'>
            Capital City : <span className='font-bold'>{Capital}</span>
          </div>
          <div id='language' className='text-base-content'>
            Official Language :{' '}
            <span className='font-bold'>{OfficialLanguage}</span>
          </div>
          <div id='currency' className='text-base-content'>
            Currency : <span className='font-bold'>{Currency} </span>
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
        <button
          className='btn btn-md btn-primary text-primary-content md:btn-md bg-neutral transition-all duration-300'
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AfricanMapModal;
