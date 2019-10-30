/* import - COMPONENT */
import React from 'react';
import T from 'prop-types';

/*
 * COMPONENT
 */
const Countries = ({ countries }) => (
  <ul>
    {countries.map(country => (
      <li key={country.name}>{country.name}</li>
    ))}
  </ul>
);

Countries.propTypes = {
  countries: T.arrayOf(
    T.shape({
      name: T.string.isRequired,
    }),
  ).isRequired,
};

export default Countries;
