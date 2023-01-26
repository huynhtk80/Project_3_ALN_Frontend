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
      <input
        type='text'
        placeholder='Search...'
        value={searchValue}
        onChange={handleChange}
      />
      <button onClick={onClickSearch}>Search Here</button>
    </div>
  );
};

export default SearchDropdown;
