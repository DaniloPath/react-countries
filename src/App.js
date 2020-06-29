import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';


export default class App extends Component {
  constructor(){
    super()

    this.state = {
      allCountries: [],
      filteredCountry: [],
      filteredPopulation: 0,
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
        filterName: name.toLowerCase(),
        flag,
        population
      }
    })

    const filteredPopulation = allCountries.reduce((acc, cur)=>{
      return acc + cur.population
    }, 0)

    this.setState({
      allCountries,
      filteredCountry: Object.assign([], allCountries),
      filteredPopulation 
    })
  }

  handleChangeFilter = (newFilter) => {
    this.setState({
      filter: newFilter,
    })
    const filterLowerCase = newFilter.toLowerCase()
    
    const filteredCountry = this.state.allCountries.filter((country)=>{
      return country.filterName.includes(filterLowerCase)
    })

    const filteredPopulation = filteredCountry.reduce((acc, cur)=>{
      return acc + cur.population
    }, 0)

    this.setState({
      filteredCountry,
      filteredPopulation,
    })
  }

  render() {
    const { filteredCountry, filter, filteredPopulation } = this.state

    return (
      <div className='container'>
        <h1 style={style.centeredTitle}>React Countries</h1>
        <Header filter={filter} countryCount={filteredCountry.length} totalPopulation={filteredPopulation} onChangeFilter={this.handleChangeFilter} />
        
        <Countries countries={filteredCountry} />
      </div>
    ) 
  }
}

const style = {
  centeredTitle: {
    textAlign: 'center',
  }, 
}
