import React from 'react';
import ReactDOM from 'react-dom';
import Slack from './components/slack';

import '../scss/main.scss';
import '../assets/favicon.ico';

const Main = function() {
  return (
    <div>
      <Slack />
    </div>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));