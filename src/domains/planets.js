import {getPlanets, addPlanet} from '../actions/planets'

const Planets = {
  getInitialState () {
    return []
  },

  append (planets, data) {
    return planets.concat(data)
  },

  register () {
    return {
      [getPlanets]: this.append,
      [addPlanet]: this.append
    }
  }
}

export default Planets
