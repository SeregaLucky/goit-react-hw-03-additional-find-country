/* import - node_modules */
import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  };

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

  newFetch = query => {
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

  render() {
    const { countries } = this.state;

    return (
      <>
        <SearchForm newFetch={this.newFetch} />

        {countries.length === 0 && <div>Find need country!</div>}
        {countries.length === 1 && <Country country={countries[0]} />}
        {countries.length >= 2 && <Countries countries={countries} />}
      </>
    );
  }
}

export default App;
