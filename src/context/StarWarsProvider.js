import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
// import apiResult from '../services/apiResult.json';

const StarWarsProvider = ({ children }) => {
  // Hooks
  const [starWarsPlanets, setStarWarsPlanets] = useState({
    apiData: {},
    dataFiltered: {},
  });

  const [searchPlanetName, setSearchPlanetName] = useState({
    filterByName: { name: '' },
  });
  const [numericFilter, setNumericFilter] = useState({
    filterByNumericValues: [],
  });
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  // End Hooks
  // Handlers
  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchPlanetName({ filterByName: { name: value } });
  };

  const handleFilterChange = ({ target }) => {
    const { value, name } = target;
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickFilter = () => {
    setNumericFilter((prev) => ({
      filterByNumericValues: [...prev.filterByNumericValues, selected],
    }));
    console.log(numericFilter);
    const { column, comparison, value } = selected;

    // Removendo coluna do dropdown
    setColumns((prev) => (prev.filter((item) => item !== column)));

    const data = starWarsPlanets.dataFiltered.filter((planet) => {
      if (comparison === 'maior que') return Number(planet[column]) > Number(value);
      if (comparison === 'menor que') return Number(planet[column]) < Number(value);
      if (comparison === 'igual a') return Number(planet[column]) === Number(value);
      return Number(planet[column]) === Number(value);
    });
    setStarWarsPlanets((prev) => ({
      ...prev,
      dataFiltered: data,
    }));
  };

  // useEffects
  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const getPlanets = async () => {
      const resp = await fetch(END_POINT);
      const data = await resp.json();
      setStarWarsPlanets(() => ({
        dataFiltered: data.results,
        apiData: data.results,
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
          dataFiltered: prev.apiData.filter((item) => item.name.includes(name)),
        };
      }
      return { ...prev, dataFiltered: prev.apiData };
    });
  }, [searchPlanetName]);

  return (
    <StarWarsContext.Provider
      value={ {
        starWarsPlanets,
        search: handleChange,
        searchPlanetName: searchPlanetName.name,
        handleFilterChange,
        selected,
        columns,
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
