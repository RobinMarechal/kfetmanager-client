import React from 'react';
import CustomerListItem from './CustomerListItem';
import lang from '../../../../resources/lang/index';


export default class CustomerListYearSubgroup extends React.Component {
    render() {
        const { orderCreation, onItemClick } = this.props;
        const { year, customers } = this.props.year;

        if (customers.length === 0) {
            return null;
        }

        return (
            <div>
                <li className="px-4 py-2 border-t bg-grey-lighter">
                    <p className="pl-4 capitalize">{lang(year)}</p>
                </li>
                {customers.map((customer) => <CustomerListItem key={customer.id}
                                                               orderCreation={orderCreation}
                                                               onItemClick={onItemClick}
                                                               customer={customer}/>)}
            </div>
        );
    }
}