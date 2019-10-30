/* import - node_modules */
import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import T from 'prop-types';

/*
 * COMPONENT
 */
class SearchForm extends Component {
  static propTypes = {
    newFetch: T.func.isRequired,
  };

  state = {
    query: '',
  };

  callNewFetchdDebounce = debounce(() => {
    this.props.newFetch(this.state.query.trim());
  }, 1000);

  shouldComponentUpdate(nextProps, nextState) {
    const { query } = this.state;

    if (query === nextState.query) return false;

    return true;
  }

  componentDidUpdate() {
    this.callNewFetchdDebounce();
  }

  changeValue = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { query } = this.state;

    return <input type="text" value={query} onChange={this.changeValue} />;
  }
}

export default SearchForm;
