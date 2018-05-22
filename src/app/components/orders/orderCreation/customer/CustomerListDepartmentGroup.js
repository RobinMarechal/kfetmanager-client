import React from 'react';
import CustomerListYearSubgroup from './CustomerListYearSubgroup';
import { upperFirstLetter } from '../../../../../libs/helpers';

export default class CustomerListDepartmentGroup extends React.Component {
    render() {
        const { customers, orderCreation, onItemClick } = this.props;
        const { department, years, nbCustomers } = this.props.department;

        if (nbCustomers === 0) {
            return null;
        }

        return (
            <div>
                <li className="first-child-no-border-top px-4 py-2 border-t bg-grey-light">
                    <p className="pl-2">{upperFirstLetter(department)}</p>
                </li>
                {Object.values(years).map((year) => <CustomerListYearSubgroup key={year.year}
                                                                              customers={customers}
                                                                              orderCreation={orderCreation}
                                                                              onItemClick={onItemClick}
                                                                              year={year}/>)}
            </div>
        );
    }
}