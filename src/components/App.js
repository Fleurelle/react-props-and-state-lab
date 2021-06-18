import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  //should change filter type
  onChangeType = () => {
    this.setState(() => {
      return {
        filters: {
          ...this.state.filters,
          type: ''
        }
      }
    })
  }

  //should fetch all pets by default
  defaultFetchPets = () => {
    fetch("/api/pets")
      .then(res => res.json())
      .then(jsonData => console.log(jsonData))

  }

  //should fetch pet types using the type parameter based on the filter
  fetchPetsParam = () => {
    fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(console.log)
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onClick={this.onChangeType}
                onFindPetsClick={this.defaultFetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
