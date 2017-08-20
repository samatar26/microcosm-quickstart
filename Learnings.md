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

## Defining an action

If we were working with let's say a planets API, the `Planets domain` wouldn't know about all of the planets right on start-up, because we have to fetch information from a server. Microcosm actions are responsible for dealing with asynchronous state. We'll move the data inside of planets out into an action, like so:

```js
export function getPlanets() {

  return new Promise((resolve, reject) => {
    resolve([
      'Mercury', 'Venus', 'Earth', 'Mars',
      'Jupiter', 'Saturn', 'Uranus', 'Neptune',
      'Pluto'
    ])
  })

}
```

Then the key thing is to _**subscribe**_ to the action using the `register()` function inside the planets domain:

```js
import {getPlanets} from '../actions/planets'

const Planets = {
  getInitialState () {
    return []
  },

  append (planets, data) {
    //planets is the initial state we return from `getInitialState`
    // Data is what we get returned from out action
    return planets.concat(data)
  },

  register () {
    return {
      // Curious? This works because Microcosm assigns a unique
      // toString() method to each action pushed into it. That means
      // the action can be used as a unique key in an object.
      [getPlanets]: this.append
    }
  }
}

export default Planets
```

We still have to use the  Presenter’s `setup lifecycle hook` to fetch the planets when the presenter boots up. When the `Planets presenter` is about the mounted to the page, it will call `setup`. This will cause a `getPlanets` to get queued up with the application's repo. Micrcosm will process the action, sending updates to the domains who indicated that they wanted to get updates based on `the register function`.

```js

import React from 'react'
import Presenter from 'microcosm/addons/presenter'
import PlanetList from '../views/planet-list'
import {getPlanets} from '../actions/planets'

class Planets extends Presenter {

  setup (repo) {
    repo.push(getPlanets)
  }

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

```

## Handling user interaction
Microcosm provides a couple of options for capturing user input and passing it into actions on such option is using the `ActionButton` add-on. This lets us modify our View layer to pull that in:

```js
import React from 'react'
import ActionButton from 'microcosm/addons/action-button'
import {addPlanet} from '../actions/planets'

export default function PlanetList ({ planets = [] }) {
  return (
    <div>
      <ul>
        {planets.map((planet) => <li key={planet}>{planet}</li>)}
      </ul>

      <ActionButton action={addPlanet} value="Alpha Centauri">
        Add Planet
      </ActionButton>
    </div>
  )
}
```

When the button is clicked, it will broadcast the `addPlanet` action. It won't do anything as we hav to create the action and subscribe our domain to it:
```js
// src/actions/planets.js
export function addPlanet(planet) {
  return planet
}

//src/domains/planets.js
register () {
  return {
    [getPlanets]: this.append,
    [addPlanet]: this.append
  }
}
```

Now we have a button in our view which triggers an action that adds a new planet to our data model. When the domain updates the state with the new planet, our _presenter_ and _view_ will update accordingly to display the new data!