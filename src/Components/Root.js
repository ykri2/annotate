import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import App from './App';
import MainComponent from './Containers/MainComponent';

/** 
 * Root component 
 * Wrappes app and routes to provider
 **/
console.log(process.env)
const Root = ({ store }) => (
      
      <Provider store={store} >
        <Router  >
              <Switch>
                  <App >
                    <Route path="/" component={() => { return <MainComponent /> } } />

                  </App>
            </Switch>
        </Router>
      </Provider>
      )


Root.propTypes = {
    store: PropTypes.object.isRequired
  }

export default Root;