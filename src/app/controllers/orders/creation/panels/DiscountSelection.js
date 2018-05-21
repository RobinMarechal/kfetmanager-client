import React from 'react';
import { formatNumber, upperFirstLetter } from '../../../../../libs/helpers';
import lang from '../../../../../resources/lang/index';
import OrderCreationContainer from '../../../../components/orders/orderCreation/common/OrderCreationContainer';
import OrderCreationTitle from '../../../../components/orders/orderCreation/common/OrderCreationTitle';
import OrderCreationFooter from '../../../../components/orders/orderCreation/common/OrderCreationFooter';
import { bindActionCreators } from 'redux';
import { discountChanged } from '../../../../actions/models/orders/index';
import { connect } from 'react-redux';
import OrderCreationBreadcrumb, { BREADCRUMB_DISCOUNT } from '../../../../components/orders/orderCreation/common/OrderCreationBreadcrumb';

class DiscountSelection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };

        this.regexp = new RegExp(/-?[0-9]*([.,][0-9]*)?%?/);

        this.onInputChange = this.onInputChange.bind(this);
    }

    render() {
        const { previous, next, orderCreation, toggleKeymaps } = this.props;
        let discount = orderCreation.discount;
        let formattedDiscount = '0';

        if(discount === '' || discount === '-' || discount === '.' || discount ==='-.') {
            discount = '0';
        }

        if (discount.endsWith('%')) {
            const numberValue = discount.substring(0, discount.length - 1);
            formattedDiscount = formatNumber(numberValue, 2) + '%';
        } else {
            formattedDiscount = formatNumber(discount, 2) + '€';
        }

        return (
            <OrderCreationContainer>
                <div>
                    <OrderCreationBreadcrumb current={BREADCRUMB_DISCOUNT}/>

                    <OrderCreationTitle
                        previous={previous}
                        next={next}
                        title={lang('discountSelection')}
                    />
                </div>

                <input className="border rounded px-4 py-2 my-0 w-full shadow"
                       type="text"
                       value={orderCreation.discount}
                       onChange={this.onInputChange}
                       onFocus={toggleKeymaps}
                       onBlur={toggleKeymaps}
                       placeholder={lang('discountSelection', upperFirstLetter)}
                />

                <OrderCreationFooter
                    title={lang('selectedDiscount', upperFirstLetter)}
                    name={formattedDiscount}
                />
            </OrderCreationContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountSelection);
