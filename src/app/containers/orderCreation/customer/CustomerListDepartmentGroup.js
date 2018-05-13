import React from 'react';
import CustomerListYearSubgroup from './CustomerListYearSubgroup';

export default class CustomerListDepartmentGroup extends React.Component {
    render() {
        const { department, years, nbCustomers } = this.props.department;

        if (nbCustomers === 0) {
            return null;
        }

        return (
            <div>
                <li className="first-child-no-border-top px-4 py-2 border-t bg-grey-light">
                    <p className="pl-2">{department}</p>
                </li>
                {Object.values(years).map((year) => <CustomerListYearSubgroup key={year.year} year={year}/>)}
            </div>
        );
    }
}