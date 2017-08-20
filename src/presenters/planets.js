import React from 'react'
import Presenter from 'microcosm/addons/presenter'
import PlanetList from '../views/planet-list'

class Planets extends Presenter {

  getModel () {
    return {
      planets: state => state.planets
    }
  }

  render () {
    const {planets} = this.model
    return <PlanetList planets={planets}/>
  }
}

export default Planets