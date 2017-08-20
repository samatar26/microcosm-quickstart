export function getPlanets() {

  return new Promise((resolve, reject) => {
    resolve([
      'Mercury', 'Venus', 'Earth', 'Mars',
      'Jupiter', 'Saturn', 'Uranus', 'Neptune',
      'Pluto'
    ])
  })

}