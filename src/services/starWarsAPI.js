const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getStarWarsPlanets = async () => {
  const resp = await fetch(END_POINT);
  const dataJSON = await resp.json();
  return dataJSON;
  // return resp.ok ? Promise.resolve(dataJSON) : Promise.reject(dataJSON);
};

export default getStarWarsPlanets;
