import React from 'react';
import { connect } from 'react-redux';
import lang from '../../../resources/lang';
import { formatNumber, upperFirstLetter } from '../../../libs/helpers';

class OrderCreationSummary extends React.Component {
    render() {
        let { customer, menu, products, discount } = this.props.orderCreation;

        const customerName = customer.id ? customer.name : '-';
        const menuName = menu.id ? menu.name : '-';
        let basePrice = 0;

        if (menu.id) {
            basePrice = menu.price;
        }
        else if (products && products.length > 0) {
            basePrice = products.map(p => p.price).reduce((acc, val) => acc + val);
        }

        let formattedDiscount = discount;
        let finalPrice = basePrice;

        if(discount === '' || discount === '-' || discount === '.' || discount ==='-.') {
            discount = '0';
        }

        if (discount.endsWith('%')) {
            const numberValue = discount.substring(0, discount.length - 1);
            formattedDiscount = formatNumber(numberValue, 2) + '%';
            finalPrice = basePrice - basePrice * numberValue / 100;
        } else {
            formattedDiscount = formatNumber(discount, 2) + '€';
            finalPrice = basePrice - discount;
        }



        return (
            <div className="p-4 ml-3 w-1/3 text-grey-darkest rounded shadow-md">
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(OrderCreationSummary);