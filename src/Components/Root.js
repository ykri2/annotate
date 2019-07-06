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
const Root = ({ store }) => (
      
      <Provider store={store} >
        <Router basename={process.env.PUBLIC_URL} >
              <Switch>
                  <App >
                    <Route exact path="/" component={() => { return <MainComponent /> } } />

                  </App>
            </Switch>
        </Router>
      </Provider>
      )


Root.propTypes = {
    store: PropTypes.object.isRequired
  }

export default Root;