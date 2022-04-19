import React from 'react';

const SearchField = () => (
  <label htmlFor="search">
    Projeto StarWars Trybe: Pesquisar:
    <input
      type="text"
      name="search"
      id="search"
      data-testid="name-filter"
      onChange={ () => {} }
    />
  </label>
);

export default SearchField;
