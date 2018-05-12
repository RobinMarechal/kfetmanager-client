import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import Config from './libs/Config';
import {REST_CONFIG} from 'laravel-rest-api-query-builder';
import App from './app/App';
import * as ReactDOM from 'react-dom';
import allReducers from './app/reducers';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';


REST_CONFIG.base_url = 'http://localhost:8000/api';
Config.load();

const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();