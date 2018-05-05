import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import Config from './libs/Config';
import {REST_CONFIG} from 'laravel-rest-api-query-builder';
import App from './App';
import * as ReactDOM from 'react-dom';


REST_CONFIG.base_url = 'http://localhost:8000/api';
Config.load();

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

// const o = new Order().with('customer.orders', 'customer.groups', 'products.subcategory.categories', 'products.subcategory.discounts', 'menu.categories').orderByDesc('id').all().then(o => console.log(o));
