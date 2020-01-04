/* import - node_modules */
import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
/* import - COMPONENT */
import Country from './components/Country/Country';
import Countries from './components/Countries/Countries';
import SearchForm from './components/SearchForm/SearchForm';

toast.configure();

/*
 * COMPONENT
 */
class App extends Component {
  state = {
    countries: [],
    query: '',
  };

  componentDidUpdate() {
    this.callNewFetchdDebounce();
  }

  callNewFetchdDebounce = debounce(() => {
    this.newFetch(this.state.query.trim());
  }, 1000);

  notifyToShortenSearch = () => {
    toast.warn('Введите еще для сокращение поиска', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  notifyInvalidSearch = () => {
    toast.warn('Такой страны нету... Попробуйте иначе.', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  newFetch = () => {
    const { query } = this.state;

    if (!query.length) {
      this.setState({ countries: [] });

      return;
    }

    axios
      .get(`https://restcountries.eu/rest/v2/name/${query}`)
      .then(response => {
        if (response.data.length > 10) {
          this.setState({ countries: [] });
          this.notifyToShortenSearch();

          return;
        }

        this.setState({ countries: response.data });
      })
      .catch(() => {
        this.notifyInvalidSearch();
        this.setState({ countries: [] });
      });
  };

  handleChange = e => this.setState({ query: e.target.value });

  render() {
    const { countries, query } = this.state;

    return (
      <>
        <SearchForm query={query} onChange={this.handleChange} />

        {countries.length === 0 && <div>Find need country!</div>}
        {countries.length === 1 && <Country country={countries[0]} />}
        {countries.length >= 2 && <Countries countries={countries} />}
      </>
    );
  }
}

export default App;
