import React from 'react';
import classNames from 'classnames';

class ProductListItem extends React.Component {
    render() {
        const { product, orderCreation, onClick, category } = this.props;

        const selected = orderCreation.products.map(p => p.id).includes(product.id);

        return (
            <li className={
                classNames("px-4 py-2 border-t cursor-pointer", {
                    'bg-purple-lighter': selected,
                    'hover:bg-purple-ligther': !selected,
                })}
                onClick={() => onClick(product, category)}>
                <p className="pl-6 capitalize">
                    {product.name}
                </p>
            </li>
        );
    }
}

export default ProductListItem;