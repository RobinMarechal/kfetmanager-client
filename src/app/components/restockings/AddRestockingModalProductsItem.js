import React from 'react';
import { isNumberValid } from '../../../libs/helpers';

export default class AddRestockingModalProductsItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        };
        
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { product } = this.props;

        return (
            <li className="px-4 py-2 border-t bg-white flex justify-between">
                <p className="pl-6 capitalize">
                    {product.name}
                </p>

                <input type="text"
                       className="border-b border-purple-lightest hover:border-purple-lighter w-1/4 text-center text-grey-darkest"
                       defaultValue={0}
                       onChange={this.onChange}
                />
            </li>
        );
    }

    onChange(event) {
        const { onUpdateQuantity, product } = this.props;
        const targetValue = event.target.value;

        if (!isNumberValid(event.target.value)) {
            event.target.value = this.state.value;
            return;
        }

        this.setState({
            value: targetValue,
        });

        onUpdateQuantity(product, targetValue);
    }
}