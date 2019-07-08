import React from 'react';
import ReactDOM from 'react-dom';

import Root from "./Components/Root";
import store from './store';
import './Components/styles/index.scss';

/** Index file with Root component **/
ReactDOM.render(<Root store={store} />, document.getElementById('root'));
