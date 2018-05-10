import React from 'react';
import Order from '../../models/Order';
import Panel from '../../components/panel/Panel';
import lang, {langFormatDate} from '../../../resources/lang/index';
import {awaitOrEmpty, capitalize, formatNumber} from '../../../libs/helpers';
import {connect} from 'react-redux';
import selectOrder from '../../actions/selectOrder';
import {bindActionCreators} from 'redux';

class OrdersPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
        };
    }

    async componentWillMount() {
        await this.findOrders();
        this.interval = setInterval(async () => {
            await this.findOrders();
        }, 1000);
    }

    async findOrders() {
        const {maxItems} = this.props;

        const orders = await awaitOrEmpty(new Order().orderByDesc('id').limit(maxItems).with('customer', 'products', 'menu').all());
        if (orders.length > 0) {
            this.setState({orders});
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {orders} = this.state;
        const title = lang("lastOrders", capitalize);

        const items = orders.map((order) => {
            const item = {
                left: [],
                right: [
                    formatNumber(order.final_price, 2) + "€",
                ],
                baseData: order,
                footer: langFormatDate(order.created_at, lang('dateTimeFormat')),
            };

            if (order.customer_id) {
                item.left.push(order.customer.name);
            }

            if (order.menu_id) {
                item.left.push(order.menu.name);
            }

            if (order.products) {
                if (order.products.length === 0) {
                    item.left.push('-');
                }
                else {
                    item.left.push(order.products.map((product) => product.name).join(', '));
                }
            }

            return item;
        });

        const titleProps = {
            title,
            button: {
                onClick: this.addOrderButtonHandler,
                tooltip: 'newOrder',
            },
        };

        const itemsProps = {
            hoverClass: 'bg-grey-lighter',
            onClick: this.showOrderDetailsHandler,
            items,
        };

        return (
            <Panel titleProps={titleProps} itemsProps={itemsProps}/>
        );
    }

    addOrderButtonHandler(event) {
        console.log('add', event);
    }

    showOrderDetailsHandler(event) {
        console.log('show', event);
    }
}

function mapStateToProps(state){
    return {
        orders: state.orders
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({selectOrder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPanel);