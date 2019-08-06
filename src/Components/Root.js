import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import App from './App';
import MainComponent from './Containers/MainComponent';
import AboutComponent from './StaticComponents/AboutComponent';
import InstructionsComponent from './StaticComponents/InstructionsComponent';
import UWrapperComponent from "./Containers/UploadComponents/UWrapperComponent";
import EWrapperComponent from "./Containers/ExportComponent/EWrapperComponent";
import CWrapperComponent from "./Containers/ConceptComponent/CWrapperComponent";
import OWrapperComponent from "./Containers/OverviewComponent/OWrapperComponent";


/** 
 * Root component 
 * Wraps app and routes to provider
 **/

const Root = ({ store }) => (
      
      <Provider store={store} >
        <Router basename="/annotate/"  >
              <Switch>
                  <App >
                    <Route exact path="/" component={() => { console.log("A");  return <MainComponent /> } } />
                    <Route exact path="/about" component={() => { console.log("B"); return <AboutComponent /> } } />
                    <Route exact path="/instructions" component={() => { console.log("C"); return <InstructionsComponent /> } } />
                    <Route exact path="/overview" component={() => { console.log("D"); return <OWrapperComponent /> } } />
                    <Route exact path="/upload" component={() => { console.log("E"); return <UWrapperComponent /> } } />
                    <Route exact path="/export" component={() => { console.log("F"); return <EWrapperComponent /> } } />
                    <Route exact path="/upload_concepts" component={() => { console.log("G"); return <CWrapperComponent /> } } />
                  </App>
            </Switch>
        </Router>
      </Provider>
      )


Root.propTypes = {
    store: PropTypes.object.isRequired
  }

export default Root;