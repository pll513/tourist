import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './common.css';
import './iconfont/iconfont.css';

ReactDOM.render((
    <App/>
), document.getElementById('root'));

registerServiceWorker();