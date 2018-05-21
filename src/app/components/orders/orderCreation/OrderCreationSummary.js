import React from 'react';
import { connect } from 'react-redux';
import lang from '../../../../resources/lang/index';
import { formatNumber, upperFirstLetter } from '../../../../libs/helpers';
import classNames from 'classnames';
import Order from '../../../models/Order';
import { bindActionCreators } from 'redux';
import { discountChanged } from '../../../actions/models/orders';

class OrderCreationSummary extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            inputValue: '',
        };

        this.regexp = new RegExp(/-?[0-9]*([.,][0-9]*)?%?/);

        this.onInputChange = this.onInputChange.bind(this);
    }

    render() {
        const { orderCreation, onSubmit } = this.props;
        let { customer, menu, products, discount, validated } = orderCreation;

        const customerName = customer.id ? customer.name : '-';
        const menuName = menu.id ? menu.name : '-';
        let basePrice = 0;

        if (menu.id) {
            basePrice = menu.price;
        }
        else if (products && products.length > 0) {
            basePrice = products.map(p => p.price).reduce((acc, val) => acc + val);
        }

        const finalPrice = Order.calculatePrice(orderCreation);
        let symbol = '€';

        if (discount[discount.length - 1] === '%') {
            symbol = '%';
            discount = discount.substring(0, discount.length - 1);
        }

        const formattedDiscount = formatNumber(discount, 2) + symbol;

        return (
            <div className="p-4 ml-3 w-1/3 text-grey-darkest rounded shadow-md flex flex-col justify-start">
                <h2 className="mb-4">
                    {lang('orderSummary', upperFirstLetter)}
                </h2>

                <table className="text leading-loose">
                    <tbody>
                    <tr>
                        <td className="align-top w-32">
                            {lang('customer', upperFirstLetter)}{lang(':')}
                        </td>
                        <td className="leading-normal text-grey-dark capitalize">
                            <i>{customerName}</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">
                            {lang('menu', upperFirstLetter)}{lang(':')}
                        </td>
                        <td className="leading-normal text-grey-dark">
                            <i className="capitalize">{menuName}</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">
                            {lang('products', upperFirstLetter)}{lang(':')}
                        </td>
                        <td className="leading-normal text-grey-dark capitalize">
                            <i>{products.length === 0 ? '-' : products.map((p) => p.name).join(', ')}</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">
                            {lang('basePrice', upperFirstLetter)}{lang(':')}
                        </td>
                        <td className="leading-normal text-grey-dark">
                            <i>
                                {formatNumber(basePrice, 2)}€
                            </i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">
                            {lang('discount', upperFirstLetter)}{lang(':')}
                        </td>
                        <td className="leading-normal text-grey-dark">
                            <i>
                                {formattedDiscount}
                            </i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">
                            {lang('finalPrice', upperFirstLetter)}{lang(':')}
                        </td>
                        <td className="leading-normal text-grey-dark">
                            <i>
                                {formatNumber(finalPrice, 2)}€
                            </i>
                        </td>
                    </tr>
                    </tbody>
                </table>


                <div className="mt-auto">
                    <input className="border rounded px-4 py-2 my-4 w-full shadow"
                           type="text"
                           value={orderCreation.discount}
                           onChange={this.onInputChange}
                           placeholder={lang('discount', upperFirstLetter)}
                    />

                    <button className={classNames(
                        'shadow',
                        'text-white',
                        'font-bold',
                        'py-2',
                        'px-8',
                        'rounded',
                        'w-full',
                        'self-end', {
                            'bg-purple': validated,
                            'hover:bg-purple-dark': validated,
                            'bg-purple-lighter': !validated,
                            'cursor-not-allowed': !validated,
                        })}
                            onClick={onSubmit}
                    >
                        {lang('submitOrder')}
                    </button>
                </div>
            </div>
        );
    }

    onInputChange(event) {
        const value = event.target.value;
        const test = this.regexp.exec(value);
        if ( test[0] === value) {
            this.setState({ inputValue: value });
            this.props.discountChanged(value);
        }
        else {
            event.target.value = this.state.inputValue;
        }
    }
}

function mapStateToProps(state) {
    return {
        orderCreation: state.orderCreation,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        discountChanged,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreationSummary);
