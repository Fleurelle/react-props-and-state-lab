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
  changeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  //Fetching pets 
  fetchPets = () => {
    // should fetch all pets by default
    let defaultURL = "/api/pets"
    // should fetch pet types using the type parameter based on the filter
    if (this.state.filters.type !== "all") {
      defaultURL = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(defaultURL)
      .then(res => res.json())
      //Set <App/>'s state.pets with the results of your fetch request 
      //so you can pass the pet data down as props to <PetBrowser />
      .then(petData => {
        this.setState({
          pets: petData
        })
      })
  }

  //should set a pet's adopted status to true
  petAdoptStatus = (petID) => {
    //GOAL: take an id for pet, find the matching pet and change isAdopted to true. 
    //1. take ID for pet 
    //2. find matching ID -i can use .map() 
    //3. change attribute
    const findPets = this.state.pets.map((pet) => {
      if (pet !== petID) {
        return {
            ...pet,
            isAdopted: true
        }
      } else {
        return null
      }
    })
    this.setState({
      pets:findPets
    })
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
                onChangeType={this.changeType}
                onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.petAdoptStatus}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App
