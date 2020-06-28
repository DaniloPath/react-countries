import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';


export default class App extends Component {
  constructor(){
    super()

    this.state = {
      allCountries: [],
      filteredCountry: [],
      filter: '',
    }
  }

  async componentDidMount(){
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await res.json()

    const allCountries = json.map(({name, numericCode, population, flag})=>{
      return {
        id: numericCode,
        name,
        flag,
        population
      }
    })

    this.setState({
      allCountries,
      filteredCountry: allCountries
    })
  }

  handleChangeFilter = (newFilter) => {
    this.setState({
      filter: newFilter,
    })


  }


  render() {
    const { allCountries, filter } = this.state

    return (
      <div className='container'>
        <h1>React Countries</h1>
        <Header filter={filter} onChangeFilter={this.handleChangeFilter} />
        
        <Countries countries={allCountries} />
      </div>
    ) 
  }
}
