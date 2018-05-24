import React from 'react';
import AddRestockingModalProductsItem from './AddRestockingModalProductsItem';

export default class AddRestockingModalProductsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            closed: false,
        };
    }

    render() {
        const { category, onUpdateQuantity } = this.props;
        const { products, name } = category;

        return (
            <div>
                <li className="first-child-no-border-top px-4 py-2 border-t bg-purple-lightest">
                    <p className="pl-2 capitalize">{name}</p>
                </li>
                {products.map((product) => <AddRestockingModalProductsItem onUpdateQuantity={onUpdateQuantity}
                                                                           key={product.id}
                                                                           product={product}
                />)}
            </div>
        );
    }
}