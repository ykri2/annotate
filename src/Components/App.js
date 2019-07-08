import React, { Component } from 'react';

import Header from './StaticComponents/Header';
import Navbar from './StaticComponents/Navbar';
import Footer from './StaticComponents/Footer';

/** 
 * App component
 * used as a wrapper around available routes
 **/

class App extends Component {
  render() { 
    return (
      <div className="App">
        <Header />
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
