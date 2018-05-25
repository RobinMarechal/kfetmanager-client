import React from 'react';
import CustomersPanel from './panels/CustomersPanel';
import OrdersPanel from './panels/OrdersPanel';
import ProductsPanel from './panels/ProductsPanel';
import { connect } from 'react-redux';
import Order from '../../models/Order';
import Product from '../../models/Product';
import { awaitOrEmpty } from '../../../libs/helpers';
import { fetchOrderBegin, fetchOrderSuccess } from '../../actions/models/orders/index';
import { fetchCustomerBegin, fetchCustomerSuccess } from '../../actions/models/customers/index';
import { fetchProductBegin, fetchProductSuccess } from '../../actions/models/products/index';
import Customer from '../../models/Customer';

export const MAX_ITEMS_PER_PANEL = 20;

class Home extends React.Component {

    componentDidMount() {
        this.loadOrders = this.loadOrders.bind(this);
        this.loadCustomers = this.loadCustomers.bind(this);
        this.loadProducts = this.loadProducts.bind(this);

        this.loadOrders();
        this.loadCustomers();
        this.loadProducts();
    }


    fetchOrders() {
        return async function (dispatch) {
            dispatch(fetchOrderBegin());
            const orders = await awaitOrEmpty(new Order().limit(MAX_ITEMS_PER_PANEL)
                                                         .orderByDesc('id')
                                                         .with('menu:id,name', 'customer:id,name', 'products:id,name')
                                                         .all());
            dispatch(fetchOrderSuccess(orders));

            return orders;
        };
    }

    fetchCustomers() {
        return async function (dispatch) {
            dispatch(fetchCustomerBegin());
            const customers = await awaitOrEmpty(new Customer().limit(MAX_ITEMS_PER_PANEL)
                                                               .orderBy('balance', 'name')
                                                               .all());
            dispatch(fetchCustomerSuccess(customers));

            return customers;
        };
    }

    fetchProducts() {
        return async function (dispatch) {
            dispatch(fetchProductBegin());
            const products = await awaitOrEmpty(new Product().limit(MAX_ITEMS_PER_PANEL)
                                                             .orderBy('stock', 'name')
                                                             .with('subcategory.category:id,name')
                                                             .all());
            dispatch(fetchProductSuccess(products));

            return products;
        };
    }

    loadOrders() {
        this.props.dispatch(this.fetchOrders());
    }

    loadCustomers() {
        this.props.dispatch(this.fetchCustomers());
    }

    loadProducts() {
        this.props.dispatch(this.fetchProducts());
    }


    render() {
        return (
            <div className="flex justify-between">
                <div className="m-8 w-1/3">
                    <OrdersPanel onSync={this.loadOrders}/>
                </div>
                <div className="w-1/3 mt-8">
                    <CustomersPanel onSync={this.loadCustomers}/>
                </div>
                <div className="m-8 w-1/3">
                    <ProductsPanel onSync={this.loadProducts}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers,
    };
}

export default connect(mapStateToProps)(Home);