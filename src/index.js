import './style/application.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Repo from './repo'
import routes from './routes'
import Presenter from 'microcosm/addons/presenter'

// Do anything on startup here
const repo = new Repo()

// Then mount the application
ReactDOM.render((
  <Presenter repo={repo}>
    {routes}
  </Presenter>
), document.getElementById('root'))
