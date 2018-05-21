import React from 'react';
import CustomerListItem from './CustomerListItem';
import lang from '../../../../../resources/lang/index';
import Customer from '../../../../models/Customer';


export default class CustomerListYearSubgroup extends React.Component {
    render() {
        const { orderCreation, onItemClick } = this.props;
        const { year, customers } = this.props.year;

        if (customers.length === 0) {
            return null;
        }

        let li = '';

        if (year !== Customer.YEARS.PEIP) {
            li = (
                <li className="px-4 py-2 border-t bg-grey-lighter">
                    <p className="pl-4 capitalize">{lang(year)}</p>
                </li>
            );
        }

        return (
            <div>
                {li}

                {customers.map((customer) => <CustomerListItem key={customer.id}
                                                               orderCreation={orderCreation}
                                                               onItemClick={onItemClick}
                                                               customer={customer}/>)}
            </div>
        );
    }
}