/* import - node_modules */
import React from 'react';
import T from 'prop-types';

/*
 * COMPONENT
 */
const SearchForm = ({ query, onChange }) => (
  <input type="text" value={query} onChange={onChange} />
);

SearchForm.propTypes = {
  query: T.string.isRequired,
  onChange: T.func.isRequired,
};

export default SearchForm;
