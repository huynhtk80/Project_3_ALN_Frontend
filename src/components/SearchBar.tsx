import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const SearchDropdown = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickSearch = () => {
    navigate({
      pathname: '/home/result',
      search: `?query=${searchValue}`,
    });
  };

  return (
    <div>
      <div className='mx-auto max-w-md'>
        <form action='' className='relative mx-auto w-max'>
          <input
            type='search'
            className='peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-gray-500 focus:pl-16 focus:pr-4'
            placeholder='Search...'
            value={searchValue}
            onChange={handleChange}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-gray-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            stroke-width='2'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </form>
      </div>
    </div>
  );
};

export default SearchDropdown;
