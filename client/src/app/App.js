import React, { useState } from 'react'
import Starwars from '../assets/star-wars.png'
import axios from 'axios'

import './App.scss'

function App() {
  const [searchData, setSearchData] = useState('')
  const [names, setNames] = useState([])

  function onInputChange(e) {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    })
  }

  function onSearchSubmit(e) {
    e.preventDefault()
    getSearchResults()
    saveSearchResults()
    e.target.reset()
  }

  function saveSearchResults() {}

  function getSearchResults() {
    const apiURL = `https://swapi.co/api/people/?search=${searchData.search}`
    console.log(apiURL)
    axios.get(apiURL).then(function(res) {
      const names = res.data.results.map(item => item.name)
      console.log('blub hier ' + names)
      setNames({
        names,
      })
    })
  }

  console.log(names)
  console.log(names.names)

  return (
    <div className="grid">
      <form className="container" onSubmit={onSearchSubmit}>
        <img src={Starwars} alt="" />
        <div>
          <input
            name="search"
            onChange={onInputChange}
            type="text"
            placeholder="...search"
            maxLength="20"
          />
          <button>ok</button>
        </div>
        <section>
          <ul>{names.names && names.names.map(item => <li>{item}</li>)}</ul>
        </section>
      </form>
    </div>
  )
}

export default App
