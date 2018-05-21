import React from 'react';

class CustomerListItem extends React.Component {
    render() {
        const { customer, orderCreation, onItemClick } = this.props;

        const classes = orderCreation.customer.id === customer.id ? 'bg-purple-lighter' : 'hover:bg-purple-lighter';

        return (
            <li className={"px-4 py-2 border-t cursor-pointer " + classes} onClick={() => onItemClick(customer)}>
                <p className="pl-6 capitalize">
                    {customer.name}
                </p>
            </li>
        );
    }
}

export default CustomerListItem;