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

### Domains
Applcation data really belongs in Microcosm. In order to this, we need to make a `Planets domain`. This domain will define all of the operations for data related to planets.

```js
// src/domains/planets.js
const Planets = {

  getInitialState() {
    return [
      'Mercury', 'Venus', 'Earth', 'Mars',
      'Jupiter', 'Saturn', 'Uranus', 'Neptune',
      'Pluto'
    ]
  }

}

export default Planets
```

Instances of Microcosm are called _**repos**_. An isolated warehouse to manage application state. It's fairly easy to connect to the planets domain:

```js
// src/repo.js
import Microcosm from 'microcosm'

class Repo extends Microcosm {
  setup () {
    this.addDomain('planets', Planets)
  }
}

export default Repo
```

What we're essentially saying here is `Mount the Planets domain to 'planets'`. Everything will be managed under `repo.state.planets` and we can subscribe to that in our Planets presenter, like so:

```js
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

```

Now it's awesomely nice and separated. When given a function, it will invoke it with the current application state! 