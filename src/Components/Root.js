import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import App from './App';
import MainComponent from './Containers/MainComponent';
import AboutComponent from './StaticComponents/AboutComponent';
import InstructionsComponent from './StaticComponents/InstructionsComponent';
import UWrapperComponent from "./Containers/UploadComponents/UWrapperComponent";

/** 
 * Root component 
 * Wrappes app and routes to provider
 **/

const Root = ({ store }) => (
      
      <Provider store={store} >
        <Router basename={process.env.PUBLIC_URL}  >
              <Switch>
                  <App >
                    <Route exact path="/" component={() => { console.log("A");  return <MainComponent /> } } />
                    <Route exact path="/about" component={() => { console.log("B"); return <AboutComponent /> } } />
                    <Route exact path="/instructions" component={() => { console.log("C"); return <InstructionsComponent /> } } />
                    <Route exact path="/upload" component={() => { console.log("D"); return <UWrapperComponent /> } } />
                  </App>
            </Switch>
        </Router>
      </Provider>
      )


Root.propTypes = {
    store: PropTypes.object.isRequired
  }

export default Root;