import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from './Home'
import Albums from './Albums'
import AboutUS from './AboutUS'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'


ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="Albums" component={Albums}/>
        <Route path="AboutUS" component={AboutUS}/>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
