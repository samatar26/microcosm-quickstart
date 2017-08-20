import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from './presenters/application'
import Planets from './presenters/planets'

export default (
  <Router>
    <div>
      <Route path="/" component={App}/>
      <Route path="/" component={Planets}/>
    </div>
  </Router>
)
