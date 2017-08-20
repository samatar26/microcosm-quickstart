import React from 'react'

export default function PlanetList ({ planets = [] }) {
  return (
    <ul>
      {planets.map((planet) => <li key={planet}>{planet}</li>)}
    </ul>
  )
}