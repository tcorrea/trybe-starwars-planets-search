import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
// import apiResult from '../services/apiResult.json';

const StarWarsProvider = ({ children }) => {
  const contextValueForData = { data: {}, dataSearched: {} };
  const contextValueForFilter = { filterByName: { name: '' } };

  const [starWarsPlanets, setStarWarsPlanets] = useState(contextValueForData);
  const [searchPlanetName, setSearchPlanetName] = useState(contextValueForFilter);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchPlanetName({ filterByName: { name: value } });
  };
  console.log(starWarsPlanets);
  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
  useEffect(() => {
    const getPlanets = async () => {
      const resp = await fetch(END_POINT);
      const data = await resp.json();
      setStarWarsPlanets(() => ({ dataSearched: data.results, data: data.results }));
    };
    getPlanets();

    // setStarWarsPlanets({  dataSearched: data.results, data: data.results });
    // setStarWarsPlanets({ data: apiResult.results });
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = searchPlanetName;

    setStarWarsPlanets((prev) => {
      if (name !== '') {
        return {
          ...prev,
          dataSearched: prev.data.filter((item) => item.name.includes(name)),
        };
      }
      return { ...prev, dataSearched: prev.data };
    });
  }, [searchPlanetName]);

  return (
    <StarWarsContext.Provider
      value={ {
        starWarsPlanets,
        search: handleChange,
        searchPlanetName: searchPlanetName.name,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.objectOf,
}.isRequired;

export default StarWarsProvider;
