import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Searchbar.css';

const SearchDropdown = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate({
        pathname: '/home/result',
        search: `?query=${searchValue}`,
      });
    }
  };

  const handleGoButtonClick = () => {
    navigate({
      pathname: '/home/result',
      search: `?query=${searchValue}`,
    });
  };

  return (
    <div className='flex justify-center form-control opacity-70 shadow-md'>
      <div className='input-group'>
        <input
          type='text'
          placeholder='Search…'
          className='input input-primary text-base-content placeholder-base-content'
          onChange={handleChange}
          onKeyDown={onClickSearch}
        />
        <button
          className='btn btn-circle btn-primary bg-primary'
          onClick={handleGoButtonClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchDropdown;
