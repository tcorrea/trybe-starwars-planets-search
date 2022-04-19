import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const SearchField = () => {
  const { searchPlanetName, search } = useContext(StarWarsContext);
  return (
    <label htmlFor="search">
      Projeto StarWars Trybe: Pesquisar:
      <input
        type="text"
        name="search"
        id="search"
        data-testid="name-filter"
        value={ searchPlanetName }
        onChange={ search }
      />
    </label>
  );
};

export default SearchField;
