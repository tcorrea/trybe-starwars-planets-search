import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
// import apiResult from '../services/apiResult.json';

const StarWarsProvider = ({ children }) => {
  // Initial state
  const contextValueForData = { data: {}, dataSearched: {} };
  const contextValueForFilter = { filterByName: { name: '' } };
  const contextValueFilterNumeric = {
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: 0,
      },
    ],
  };

  // Hooks
  const [starWarsPlanets, setStarWarsPlanets] = useState(contextValueForData);
  const [searchPlanetName, setSearchPlanetName] = useState(
    contextValueForFilter,
  );
  const [numericFilter, setNumericFilter] = useState(contextValueFilterNumeric);

  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchPlanetName({ filterByName: { name: value } });
  };

  // Handlers
  const handleFilterChange = ({ target }) => {
    const { value, name } = target;
    setNumericFilter((prev) => ({
      filterByNumericValues: [
        { ...prev.filterByNumericValues[0], [name]: value },
      ],
    }));
  };

  const handleClickFilter = () => {
    const { column, comparison, value } = numericFilter.filterByNumericValues[0];
    console.log(numericFilter);

    const data = starWarsPlanets.data.filter((planet) => {
      // console.log('planet[column]:', planet[column]);
      // console.log('column:', column);
      if (comparison === 'maior que') return Number(planet[column]) > Number(value);
      if (comparison === 'menor que') return Number(planet[column]) < Number(value);
      if (comparison === 'igual a') return Number(planet[column]) === Number(value);
      return planet;
    });

    setStarWarsPlanets((prev) => ({ ...prev, dataSearched: data }));
  };

  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const getPlanets = async () => {
      const resp = await fetch(END_POINT);
      const data = await resp.json();
      setStarWarsPlanets(() => ({
        dataSearched: data.results,
        data: data.results,
      }));
    };
    getPlanets();

    // setStarWarsPlanets({  dataSearched: data.results, data: data.results });
    // setStarWarsPlanets({ data: apiResult.results });
  }, []);

  useEffect(() => {
    const {
      filterByName: { name },
    } = searchPlanetName;

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

  useEffect(() => {});

  return (
    <StarWarsContext.Provider
      value={ {
        starWarsPlanets,
        search: handleChange,
        searchPlanetName: searchPlanetName.name,
        handleFilterChange,
        numericFilter,
        handleClickFilter,
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
