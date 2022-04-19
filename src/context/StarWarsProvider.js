import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  const INITIAL_STATE = {
    data: {},
    filterByName: { name: '' },
  };
  const [starWarsPlanets, setStarWarsPlanets] = useState(INITIAL_STATE);
  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const getPlanets = async () => {
      const resp = await fetch(END_POINT);
      const data = await resp.json();
      // const data = await fetch(END_POINT).then((response) => response.json());
      setStarWarsPlanets((prev) => ({ data: data.results, ...prev }));
    };
    getPlanets();
  }, []);

  return (
    <StarWarsContext.Provider value={ starWarsPlanets }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.objectOf,
}.isRequired;

export default StarWarsProvider;
