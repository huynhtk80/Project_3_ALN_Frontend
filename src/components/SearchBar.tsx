import { useState } from 'react';
import { useNavigate } from 'react-router';

const SearchDropdown = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onClickSearch = (e: any) => {
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
    <div className='flex justify-center rounded-xl shadow-md'>
      <div className='input-group border border-solid rounded-xl border-secondary-content'>
        <input
          type='text'
          placeholder='Search ALN...'
          className='input input-primary w-full input-sm md:input-md md:w-56  lg:w-96 text-base-content placeholder-primary-content opacity-50 transition-all duration-300'
          onChange={handleChange}
          onKeyDown={onClickSearch}
        />
        <button
          className='btn btn-sm btn-primary md:btn-md  bg-primary-focus border-none transition-all duration-300'
          onClick={handleGoButtonClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 stroke-primary-content'
            fill='none'
            viewBox='0 0 24 24'
            // stroke='currentColor'
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
