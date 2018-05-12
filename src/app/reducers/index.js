import {combineReducers} from 'redux';
import customersReducer from './customers/customersReducer';
import ordersReducer from './ordersReducer';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import menusReducer from './menusReducer';
import treasuryReducer from './treasuryReducer';
import selectedCustomerReducer from './customers/selectedCustomersReducer';
import searchReducer from './searchReducer';

const allReducers = combineReducers({
    customers: customersReducer,
    orders: ordersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    menus: menusReducer,
    treasury: treasuryReducer,
    selectedCustomer: selectedCustomerReducer,
    searchReducer: searchReducer
});

export default allReducers;