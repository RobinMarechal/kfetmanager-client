import {combineReducers} from 'redux';
import CustomersReducer from './CustomersReducer';
import OrdersReducer from './OrdersReducer';
import ProductsReducer from './ProductsReducer';

const allReducers = combineReducers({
    customers: CustomersReducer,
    orders: OrdersReducer,
    products: ProductsReducer,
});

export default allReducers;