import React from 'react'
import Presenter from 'microcosm/addons/presenter'
import PlanetList from '../views/planet-list'

class Planets extends Presenter {
  render () {
    return <PlanetList/>
  }
}

export default Planets