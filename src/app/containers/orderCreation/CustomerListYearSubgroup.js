import React from 'react';
import CustomerListItem from './CustomerListItem';
import lang from '../../../resources/lang';
import { capitalize } from '../../../libs/helpers';

export default class CustomerListYearSubgroup extends React.Component {
    render() {
        const { year, customers } = this.props.year;

        if (customers.length === 0) {
            return null;
        }

        return (
            <div>
                <li className="px-4 py-2 border-t bg-grey-lighter">
                    <p className="pl-4">{lang(year, capitalize)}</p>
                </li>
                {customers.map((customer) => <CustomerListItem key={customer.id} customer={customer}/>)}
            </div>
        );
    }
}