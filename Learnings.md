# Microcosm

## Presenters
Presenters are just special React components that are charged with higher levels of responsibility. There are a number of reasons why we make a distinction between them and dumb view components:

- Presenters provide an answer for where to _**keep data operations**_ and _**dispatch application actions**_
- Presenters are a gateway. They keep application concerns outside of the majority of the presentation layer.
- Testing and refactoring becomes a lot easier, because everything in the views path is isolated. Similar to dumb components.

`There seems to be a good separation of the view layer of your application and the the rest of the application concerns`

i.e.: Presenter:
```js
import Presenter from 'microcosm/addons/presenter'
import Layout from '../views/layout'

class Application extends Presenter {
  view = Layout
}

export default Application
```

View:
```js
import React from 'react'

export default function Layout ({children}) {

  return (
    <div>
      <h1>Solar System</h1>
      {children}
    </div>
  )
}

```