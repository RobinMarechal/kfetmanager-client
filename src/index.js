import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import Config from './app/libs/Config';
import {REST_CONFIG} from 'laravel-rest-api-query-builder';
import App from './app/App';
import * as ReactDOM from 'react-dom';
import {formatNumber} from './app/libs/helpers';


REST_CONFIG.base_url = 'http://localhost:8000/api';
Config.load();

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();