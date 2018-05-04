import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import Config from './libs/Config';
import {loadObjectMethods, loadStringMethods} from './libs/helpers';
import {REST_CONFIG} from 'laravel-rest-api-query-builder';
import App from './App';
import * as ReactDOM from 'react-dom';
import Treasury from './app/models/Treasury';

loadStringMethods();
loadObjectMethods();

REST_CONFIG.base_url = 'http://localhost:8000/api';
Config.load();

Treasury.getTreasury().then(t => console.log(t));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// const o = new Order().with('customer.orders', 'customer.groups', 'products.subcategory.categories', 'products.subcategory.discounts', 'menu.categories').orderByDesc('id').all().then(o => console.log(o));
