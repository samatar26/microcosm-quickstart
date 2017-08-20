# Microcosm

## Presenters
Presenters are just special React components that are charged with higher levels of responsibility. There are a number of reasons why we make a distinction between them and dumb view components:

- Presenters provide an answer for where to _**keep data operations**_ and _**dispatch application actions**_
- Presenters are a gateway. They keep application concerns outside of the majority of the presentation layer.
- Testing and refactoring becomes a lot easier, because everything in the views path is isolated. Similar to dumb components.

`There seems to be a good separation of the view layer of your application and the the rest of the application concerns`

i.e.: Presenter:
```js
import React from 'react'
import Presenter from 'microcosm/addons/presenter'
import PlanetList from '../views/planet-list'

class Planets extends Presenter {
  render () {
    return <PlanetList/>
  }
}

export default Planets
```

View:
```js
import React from 'react'

export default function PlanetList () {
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
```

### getModel method
There is still a problem with the way I've created my presenter and view, which is that the `PlanetList` component knows all about the data and it shouldn't care whether or not Uranus is a real planet or not. So we need to prepare data in the presenter to send down into the `PlanetList` view. Presenters can implement a `getModel` method to do just that:

```js
import React from 'react'
import Presenter from 'microcosm/addons/presenter'
import PlanetList from '../views/planet-list'

class Planets extends Presenter {

  getModel () {
    return {
      planets: () => ['Mercury', 'Venus', 'Eart', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    }
  }

  render () {
    const {planets} = this.model
    return <PlanetList planets={planets}/>
  }
}

export default Planets

```

```js
import React from 'react'

export default function PlanetList ({ planets = [] }) {
  return (
    <ul>
      {planets.map((planet) => <li key={planet}>{planet}</li>)}
    </ul>
  )
}
```