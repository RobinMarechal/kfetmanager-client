import React from 'react';
import Panel from '../../../components/panel/Panel';
import lang from '../../../../resources/lang/index';
import { capitalize, formatNumber, stringPlural } from '../../../../libs/helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { customerClicked } from '../../../actions/models/customers/index';
import { faPlus, faSyncAlt } from '@fortawesome/fontawesome-free-solid';
import { faCog } from '@fortawesome/fontawesome-free-solid/index.es';
import Config from '../../../../libs/Config';

class CustomersPanel extends React.Component {

    buildItems(customers) {
        return customers.map((customer) => {
                return {
                    left: [
                        customer.name,
                    ],
                    right: [
                        formatNumber(customer.balance, 2) + "€",
                    ],
                    baseData: customer,
                };
            },
        );
    }

    buildTitleProps() {
        const { onSync } = this.props;
        return {
            title: lang("customer", stringPlural, capitalize),
            buttons: [
                {
                    icon: faSyncAlt,
                    onClick: onSync,
                    tooltip: 'refresh',
                },
                {
                    icon: faPlus,
                    onClick: this.manageProductsButtonHandler,
                    tooltip: 'newCustomer',
                },
                {
                    icon: faCog,
                    link: 'manage-customers',
                    tooltip: 'manageCustomers',

                },
            ],
        };
    }

    buildItemProps(items) {
        return {
            hoverClass: 'bg-grey-lighter',
            onClick: this.showCustomerDetailsHandler,
            items,
            colorFunction: this.colorFunction,
        };
    }

    render() {
        const { items, loading, error } = this.props.customers;

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

    colorFunction(info) {
        const threshold = Config.instance.get('app.customers.criticalBalance');
        const value = parseFloat(info.substring(0, info.length - 1));
        if (!value || isNaN(value) || value <= threshold) {
            return 'red-light';
        }
    }

    manageProductsButtonHandler(event) {
        console.log('add', event);
    }

    showCustomerDetailsHandler(event) {
        console.log('show', event);
    }
}

function mapStateToProps(state) {
    return {
        customers: state.customers,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ customerClicked }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPanel);