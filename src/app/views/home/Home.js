import React from 'react';
import CustomersPanel from './CustomersPanel';
import OrdersPanel from './OrdersPanel';
import ProductsPanel from './ProductsPanel';

export default function Home (props){

    const maxItems = 20;

    return (
        <div className="flex justify-between">
            <div className="m-8 w-1/3">
                <OrdersPanel maxItems={maxItems}/>
            </div>
            <div className="w-1/3 mt-8">
                <CustomersPanel maxItems={maxItems}/>
            </div>
            <div className="m-8 w-1/3">
                <ProductsPanel maxItems={maxItems}/>
            </div>
        </div>
    );
}