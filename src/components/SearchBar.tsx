import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {showInput && (
        <motion.div
          className='fixed top-0 left-0 w-full h-full'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className='fixed top-0 left-0 w-full h-full bg-gray-300 opacity-75'></div>
          <div className='bg-white rounded-lg px-4 py-5 overflow-hidden shadow-xl transform transition-all absolute top-0 left-0'>
            <div className='flex items-center'>
              <input
                type='text'
                value={searchValue}
                onChange={handleChange}
                onKeyDown={onClickSearch}
                className='w-full h-10 pl-2 text-lg'
                placeholder='Search'
              />
              <button
                className='ml-2 h-10 px-2 py-1 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-l'
                onClick={handleGoButtonClick}
              >
                Go
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <div
        className='flex items-center justify-center cursor-pointer h-6 w-6 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:shadow-outline'
        onClick={() => setShowInput(!showInput)}
      >
        <i className='fas fa-search text-gray-500'></i>
      </div>
    </AnimatePresence>
  );
};

export default SearchDropdown;
