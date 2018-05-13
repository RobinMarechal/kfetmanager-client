import { combineReducers } from 'redux';
import customersReducer from './customers/customersReducer';
import ordersReducer from './orders/ordersReducer';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import menusReducer from './menus/menusReducer';
import treasuryReducer from './treasuryReducer';
import selectedCustomerReducer from './customers/selectedCustomerReducer';
import searchReducer from './searchReducer';
import orderCreationReducer from './orders/orderCreationReducer';
import selectedMenuReducer from './menus/selectedMenuReducer';

const allReducers = combineReducers({
    customers: customersReducer,
    orders: ordersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    menus: menusReducer,
    treasury: treasuryReducer,
    selectedCustomer: selectedCustomerReducer,
    searchReducer: searchReducer,
    orderCreation: orderCreationReducer,
    selectedMenu: selectedMenuReducer,
});

export default allReducers;