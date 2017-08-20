import React from 'react'
import Presenter from 'microcosm/addons/presenter'

class Planets extends Presenter {
  render () {
    return (
      <ul>
       <li>Mercury</li>
       <li>Venus</li>
       <li>Earth</li>
       <li>Mars</li>
       <li>Jupiter</li>
       <li>Saturn</li>
       <li>Uranus</li>
       <li>Neptune</li>
       <li>Pluto</li>
      </ul>
    )
  }
}

export default Planets