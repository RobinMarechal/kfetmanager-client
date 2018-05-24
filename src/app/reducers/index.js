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
import subcategoriesReducer from './subcategoriesReducer';
import { CLEAR_REDUCERS } from '../actions/clearReducers';
import keyMapReducer from './keyMapReducer';
import restockingReducer from './restockings/restockingReducer';

const appReducer = combineReducers({
    customers: customersReducer,
    orders: ordersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    menus: menusReducer,
    treasury: treasuryReducer,
    selectedCustomer: selectedCustomerReducer,
    searchReducer: searchReducer,
    orderCreation: orderCreationReducer,
    selectedMenu: selectedMenuReducer,
    keyMap: keyMapReducer,
    restockings: restockingReducer,
});

const rootReducer = (state, action) => {
    if (action.type === CLEAR_REDUCERS) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;