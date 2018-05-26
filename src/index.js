import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import Config from './libs/Config';
import App from './app/App';
import * as ReactDOM from 'react-dom';
import rootReducer from './app/reducers';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

Config.instance.load().then(() => {

    const store = createStore(
        rootReducer,
        applyMiddleware(thunk),
    );

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root'),
    );

    registerServiceWorker();
});
