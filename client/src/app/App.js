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

  function saveSearchResults() {
    const serverURL = 'http://localhost:4000/search'

    axios.post(serverURL, searchData).then(function(res) {})
  }

  function getSearchResults() {
    const apiURL = `https://swapi.co/api/people/?search=${searchData.search}`
    axios.get(apiURL).then(function(res) {
      if (res.data.count !== 0) {
        const names = res.data.results.map(item => item.name)
        setNames({
          names,
        })
      } else {
        alert('Meister Yoda: Dieser Namen nicht existent sein.')
      }
    })
  }

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
          <button>Search</button>
        </div>
        <section>
          {names.names &&
            names.names.map(item => (
              <div className="list" key={item}>
                {item}
              </div>
            ))}
        </section>
      </form>
    </div>
  )
}

export default App
