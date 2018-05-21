import React from 'react';
import Panel from '../../../components/panel/Panel';
import lang from '../../../../resources/lang/index';
import { capitalize, formatNumber } from '../../../../libs/helpers';
import { connect } from 'react-redux';
import { faPlus, faSyncAlt } from '@fortawesome/fontawesome-free-solid/index';
import { faHistory } from '@fortawesome/fontawesome-free-solid/index.es';

class OrdersPanel extends React.Component {

    constructor(props) {
        super(props);

        this.refreshButtonHandler.bind(this);
        this.showOrderDetailsHandler.bind(this);
    }

    buildItems(orders) {
        const items = orders.map((order) => {
            const { customer_id, menu_id, products, final_price, created_at, customer, menu } = order;

            const item = {
                left: [],
                right: [
                    formatNumber(final_price, 2) + "€",
                ],
                baseData: order,
                footer: created_at.toString().replace('T', ' '),
                // footer: langFormatDate(created_at, lang('dateTimeFormat')),
            };

            if (customer_id) {
                item.left.push(customer.name);
            }

            if (menu_id) {
                item.left.push(menu.name);
            }

            if (products) {
                if (products.length === 0) {
                    item.left.push('-');
                }
                else {
                    item.left.push(products.map((product) => product.name).join(', '));
                }
            }

            return item;
        });

        return items;
    }

    buildTitleProps() {
        const { onSync } = this.props;

        return {
            title: lang("lastOrders", capitalize),
            link: 'azbc',
            buttons: [
                {
                    icon: faSyncAlt,
                    onClick: onSync,
                    tooltip: 'refresh',
                },
                {
                    icon: faPlus,
                    tooltip: 'newOrder',
                    link: 'new-order'
                },
                {
                    icon: faHistory,
                    link: 'order-history',
                    tooltip: 'orderHistory'

                },
            ],
        };
    }

    buildItemProps(items) {
        return {
            hoverClass: 'bg-grey-lighter',
            onClick: this.showOrderDetailsHandler,
            items,
        };

    }

    render() {
        const { items, loading, error } = this.props.orders;

        const titleProps = this.buildTitleProps();

        if (error) {
            return (
                <Panel titleProps={titleProps} error={error}/>
            );
        }
        else if (loading) {
            return (
                <Panel titleProps={titleProps} loading={true}/>
            );
        }
        else {
            const productItems = this.buildItems(items);
            const itemsProps = this.buildItemProps(productItems);
            return (
                <Panel titleProps={titleProps} itemsProps={itemsProps}/>
            );
        }
    }

    showOrderDetailsHandler(event) {
        console.log('show', event);
    }

    refreshButtonHandler(event) {
        console.log(this);
        // const { onSync } = this.props;
        // onSync();
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
    };
}

export default connect(mapStateToProps)(OrdersPanel);