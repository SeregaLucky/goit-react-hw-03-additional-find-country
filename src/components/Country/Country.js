/* import - COMPONENT */
import React from 'react';
import T from 'prop-types';

/*
 * COMPONENT
 */
const Country = ({
  country: { name, capital, population, languages, flag },
}) => {
  return (
    <section>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>

      <p>Languages:</p>
      <ul>
        {languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>

      <img src={flag} alt="Flag" style={{ width: 200 }} />
    </section>
  );
};

Country.propTypes = {
  country: T.shape({
    name: T.string.isRequired,
    capital: T.string.isRequired,
    population: T.number.isRequired,

    languages: T.arrayOf(
      T.shape({
        name: T.string.isRequired,
      }),
    ).isRequired,

    flag: T.string.isRequired,
  }).isRequired,
};

export default Country;
