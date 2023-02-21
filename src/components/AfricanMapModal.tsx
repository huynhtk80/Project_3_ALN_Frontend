import React from 'react';
import { Link } from 'react-router-dom';
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
    PlacesOfInterest,
  } = AfricanCountryList[props.selectedCountry.toUpperCase()];
  return (
    <div
      className='modal-overlay z-50 fixed top-0 bottom-0 left-0 right-0'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className='modal-content bg-primary text-lg p-4 rounded-lg bg-opacity-80 '>
        <div className='order-2 border-solid rounded-lg border-primary bg-primary-focus bg-opacity-80 shadow-lg p-5 w-96'>
          <Link
            to={'/Home/Category/All/' + CountryName}
            className='font-bold text-4xl'
            id='name'
          >
            <button
              className='btn btn-md btn-primary text-base-content  transition-all duration-300 mb-5'
              onClick={() => setShowModal(false)}
              style={{ height: 'auto' }}
            >
              {CountryName}
            </button>
          </Link>
          <div
            id='flag'
            className='text-base-content float-right scale-150 mx-5'
          >
            <img src={Flag} className='text-sm'></img>
          </div>
          <div id='Quadrent' className='text-sucess-content'>
            Region : <span className='font-bold'>{Quadrant}</span>
          </div>

          <div id='PopulationSize' className='text-sucess-content'>
            Population Size :{' '}
            <span className='font-bold'>{PopulationSize.toLocaleString()}</span>
          </div>

          <div id='capital' className='text-sucess-content'>
            Capital City : <span className='font-bold'>{Capital}</span>
          </div>

          <div id='Language' className='text-sucess-content'>
            Official Language :{' '}
            <span className='font-bold'>{OfficialLanguage}</span>
          </div>

          <div id='Currency' className='text-sucess-content'>
            Currency : <span className='font-bold'>{Currency} </span>
          </div>

          <div id='PlacesOfInterest' className='text-sucess-content '>
            Natural Attractions :{' '}
            <span className=' font-bold'>{PlacesOfInterest}</span>
          </div>
        </div>

        <p>Explore Local:</p>
        <ul>
          <li>
            <Link to={'/Home/Category/Film/' + CountryName}>
              <button
                className='btn btn-md btn-primary text-white md:btn-md bg-neutral transition-all duration-300'
                onClick={() => setShowModal(false)}
              >
                Film
              </button>
            </Link>

            <Link to={'/Home/Category/Short%20Film/' + CountryName}>
              <button
                className='btn btn-md btn-primary text-white md:btn-md bg-neutral transition-all duration-300'
                onClick={() => setShowModal(false)}
              >
                Shorts
              </button>
            </Link>

            <Link to={'/Home/Category/Documentary/' + CountryName}>
              <button
                className='btn btn-md btn-primary text-white md:btn-md bg-neutral transition-all duration-300'
                onClick={() => setShowModal(false)}
              >
                Documentaries
              </button>
            </Link>
          </li>
          <li>
            <Link to={'/Home/category/Series/' + CountryName}>
              <button
                className='btn btn-md btn-primary text-white md:btn-md bg-neutral transition-all duration-300'
                onClick={() => setShowModal(false)}
              >
                Series
              </button>
            </Link>
            <Link to={'/home/Marketing'}>
              <button
                className='btn btn-md btn-primary text-white md:btn-md bg-neutral transition-all duration-300'
                onClick={() => setShowModal(false)}
              >
                Want to get involved?
              </button>
            </Link>
          </li>
        </ul>
        <div className='justify-end flex'>
          <button
            className='btn btn-md btn-secondary text-white md:btn-md bg-neutral transition-all duration-300'
            onClick={() => setShowModal(false)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default AfricanMapModal;
