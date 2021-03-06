import React from 'react';
import { customerClicked, fetchCustomerBegin, fetchCustomerError, fetchCustomerSuccess } from '../../../../actions/models/customers';
import Customer from '../../../../models/Customer';
import Error from '../../../../components/utility/Error';
import CustomerListDepartmentGroup from '../../../../components/orders/orderCreation/customer/CustomerListDepartmentGroup';
import OrderCreationContainer from '../../../../components/orders/orderCreation/common/OrderCreationContainer';
import OrderCreationBreadcrumb, { BREADCRUMB_CUSTOMER } from '../../../../components/orders/orderCreation/common/OrderCreationBreadcrumb';
import OrderCreationTitle from '../../../../components/orders/orderCreation/common/OrderCreationTitle';
import OrderCreationSearchBar from '../../../../components/orders/orderCreation/common/OrderCreationSearchBar';
import { upperFirstLetter } from '../../../../../libs/helpers';
import Select from '../../../../components/forms/Select';
import OrderCreationFooter from '../../../../components/orders/orderCreation/common/OrderCreationFooter';
import lang from '../../../../../resources/lang';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CustomerList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            department: '*',
            year: '*',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDepartmentSelectChange = this.handleDepartmentSelectChange.bind(this);
        this.handleYearSelectChange = this.handleYearSelectChange.bind(this);
        this.fetchCustomers = this.fetchCustomers.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(this.fetchCustomers());
    }


    /**
     *
     * @param wheres {array} array of object like {left, operator, right}
     * @returns {Function}
     */
    fetchCustomers(...wheres) {
        return async (dispatch) => {
            dispatch(fetchCustomerBegin());
            try {
                let query = new Customer();

                for (const w of wheres) {
                    query = query.where(w.left, w.operator, w.right);
                }

                if (this.state.department !== '*') {
                    query = query.where('department', '=', this.state.department);
                }

                if (this.state.year !== '*') {
                    query = query.where('year', '=', this.state.year);
                }

                const customers = await query.all();
                dispatch(fetchCustomerSuccess(customers));

                return customers;
            }
            catch (e) {
                console.log(e);
                dispatch(fetchCustomerError());
                return [];
            }
        };
    }

    buildList() {
        const { customers, orderCreation } = this.props;

        if (customers.error) {
            return <Error/>;
        }

        if (customers.items.length === 0) {
            return (
                <div className="px-4 py-2">
                    <p className="pl-6 text-center">
                        -
                    </p>
                </div>
            );
        }

        let depYearCustomers = Customer.sortByYearDepartmentAndName(customers.items);
        depYearCustomers = Customer.customersToDepartmentYearCustomerList(depYearCustomers);

        return Object.values(depYearCustomers).map((dep) => {
            return <CustomerListDepartmentGroup key={dep.department}
                                                customers={customers}
                                                orderCreation={orderCreation}
                                                onItemClick={this.onItemClick}
                                                department={dep}/>;
        });
    }

    render() {
        const { next, orderCreation, toggleKeymaps } = this.props;

        return (
            <OrderCreationContainer>
                <div>
                    <OrderCreationBreadcrumb current={BREADCRUMB_CUSTOMER}/>

                    <OrderCreationTitle
                        next={next}
                        title={lang('customerSelection')}
                    />

                    <OrderCreationSearchBar
                        placeholder={lang('searchCustomer', upperFirstLetter)}
                        onKeyDown={this.handleInputChange}
                        onChange={this.handleInputChange}
                        onFocus={toggleKeymaps}
                        onBlur={toggleKeymaps}
                    />


                    <div className="flex justify-between my-4">
                        <Select
                            className="mr-3 shadow"
                            items={Object.values(Customer.DEPARTMENTS)}
                            onChange={this.handleDepartmentSelectChange}
                            allValue="*"
                            allText={lang('allDepartments', upperFirstLetter)}
                            itemFormatter={(item) => lang(item, upperFirstLetter)}
                        />

                        <Select
                            className="ml-3 shadow"
                            items={Object.values(Customer.YEARS)}
                            onChange={this.handleYearSelectChange}
                            allValue="*"
                            allText={lang('allYears', upperFirstLetter)}
                            itemFormatter={(item) => lang(item, upperFirstLetter)}
                        />
                    </div>
                </div>

                <ul className="indent-lg px-0 text-grey-darkest h-auto overflow-y-auto shadow border rounded list-style-none my-4">
                    {this.buildList()}
                </ul>

                <OrderCreationFooter
                    title={lang('selectedCustomer', upperFirstLetter)}
                    name={orderCreation.customer.name}
                />

            </OrderCreationContainer>
        );
    }

    async handleDepartmentSelectChange(event) {
        await this.setState({ department: event.target.value });
        this.props.dispatch(this.fetchCustomers());
    }

    async handleYearSelectChange(event) {
        await this.setState({ year: event.target.value });
        this.props.dispatch(this.fetchCustomers());
    }

    onItemClick(customer) {
        this.props.customerClicked(customer);
    }

    handleInputChange(event) {
        this.props.dispatch(this.fetchCustomers({
            left: 'name',
            operator: 'LIKE',
            right: '%' + event.target.value + '%',
        }));
    }
}

function mapStateToProps(state) {
    return {
        orderCreation: state.orderCreation,
        customers: state.customers,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            customerClicked,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);