import React from 'react';
import CustomersPanel from '../containers/home/CustomersPanel';
import OrdersPanel from '../containers/home/OrdersPanel';
import ProductsPanel from '../containers/home/ProductsPanel';

export default function Home(props) {

    const maxItems = 20;

    return (
        <div className="flex justify-between">
            <div className="m-8 w-1/3">
                <OrdersPanel/>
            </div>
            <div className="w-1/3 mt-8">
                <CustomersPanel/>
            </div>
            <div className="m-8 w-1/3">
                <ProductsPanel/>
            </div>
        </div>
    );
}