import React from 'react';
import ReactDOM from 'react-dom';
import Main from './js/pages/main'

const appRootDomElement = document.getElementById('root');
if (appRootDomElement) {
    ReactDOM.render(<Main />, appRootDomElement);
}
