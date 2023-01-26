import React, { useState } from 'react';

const SearchDropdown = () => {
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState(['algeria', 'egypt', 'Niger']);
  console.log(options);

  const countries = ['algeria', 'egypt', 'Niger'];

  const handleChange = (e) => {
    setSearchValue(e.target.value);

    // Use the searchValue to filter the options
    const filteredOptions = countries.filter((option) =>
      option.includes(e.target.value)
    );
    setOptions(filteredOptions);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchValue}
        onChange={handleChange}
      />
      <ul>
        {options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDropdown;
