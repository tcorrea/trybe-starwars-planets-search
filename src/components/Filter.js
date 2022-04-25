import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Filter = () => {
  const context = useContext(StarWarsContext);
  const { handleFilterChange, numericFilter, handleClickFilter } = context;

  const { column, comparison, value } = numericFilter.filterByNumericValues[0];
  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const comparisonOpts = ['maior que', 'menor que', 'igual a'];
  return (
    <>
      <label htmlFor="column">
        Column
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          value={ column }
          onChange={ handleFilterChange }
        >
          {columns.map((item, i) => (
            <option value={ item } key={ i }>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="comparison">
        Operador
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleFilterChange }
        >
          {comparisonOpts.map((comparisonItem, index) => (
            <option value={ comparisonItem } key={ index }>
              {comparisonItem}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="value">
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-filter"
          value={ value }
          onChange={ handleFilterChange }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
      >
        Filtrar
      </button>
    </>
  );
};

export default Filter;
