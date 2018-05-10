import React from 'react';
import Panel from '../../ui/reusable/panel/Panel';
import lang, {langFormatDate} from '../../../resources/lang/index';
import {awaitOrEmpty, capitalize, formatNumber, stringPlural} from '../../libs/helpers';
import Customer from '../../models/Customer';
import Order from '../../models/Order';

export default class CustomersPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
        };
    }

    async componentWillMount() {
        await this.findCustomers();
        this.interval = setInterval(async () => {
            await this.findCustomers();
        }, 1000);
    }

    async findCustomers() {
        const {maxItems} = this.props;

        const customers = await awaitOrEmpty(awaitOrEmpty(new Customer().orderBy('balance').limit(maxItems).all()));

        if (customers.length > 0) {
            this.setState({customers});
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {customers} = this.state;
        const title = lang("customer", stringPlural, capitalize);


        const items = customers.map((customer) => {
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

        const titleProps = {
            title,
            button: {
                onClick: this.addCustomerButtonHandler,
                tooltip: 'newCustomer',
            },
        };

        const itemsProps = {
            hoverClass: 'bg-grey-lighter',
            onClick: this.showCustomerDetailsHandler,
            items,
        };

        return (
            <Panel titleProps={titleProps} itemsProps={itemsProps}/>
        );
    }

    addCustomerButtonHandler(event) {
        console.log('add', event);
    }

    showCustomerDetailsHandler(event) {
        console.log('show', event);
    }
}