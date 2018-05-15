import React from 'react';
import { connect } from 'react-redux';
import { upperFirstLetter } from '../../../../libs/helpers';
import lang from '../../../../resources/lang/index';
import Customer from '../../../models/Customer';
import CustomerListDepartmentGroup from '../../../containers/orderCreation/customer/CustomerListDepartmentGroup';
import '../../../../resources/css/style.css';
import { customerClicked, fetchCustomerBegin, fetchCustomerError, fetchCustomerSuccess } from '../../../actions/models/customers';
import Error from '../../../components/utility/Error';
import { bindActionCreators } from 'redux';
import OrderCreationContainer from '../../../containers/orderCreation/common/OrderCreationContainer';
import OrderCreationTitle from '../../../containers/orderCreation/common/OrderCreationTitle';
import OrderCreationSearchBar from '../../../containers/orderCreation/common/OrderCreationSearchBar';
import OrderCreationSelect from '../../../containers/orderCreation/common/OrderCreationSelect';
import OrderCreationFooter from '../../../containers/orderCreation/common/OrderCreationFooter';

class CustomerList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            department: '*',
            year: '*',
        };

        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
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
                        <OrderCreationSelect
                            className="mr-3"
                            items={Customer.DEPARTMENTS}
                            onChange={this.handleDepartmentSelectChange}
                            allValue="*"
                            allText={lang('allDepartments', upperFirstLetter)}
                        />

                        <OrderCreationSelect
                            className="ml-3"
                            items={Customer.YEARS}
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

    onItemClick(customer){
        this.props.customerClicked(customer)
    }

    handleInputChange(event) {
        this.props.dispatch(this.fetchCustomers({
            left: 'name',
            operator: 'LIKE',
            right: '%' + event.target.value + '%',
        }));
    }

    handleInputKeyDown(event) {

    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators({
            customerClicked
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);