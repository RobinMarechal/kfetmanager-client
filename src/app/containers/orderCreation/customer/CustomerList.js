import React from 'react';
import { connect } from 'react-redux';
import { upperFirstLetter } from '../../../../libs/helpers';
import lang from '../../../../resources/lang/index';
import Customer from '../../../models/Customer';
import CustomerListDepartmentGroup from './CustomerListDepartmentGroup';
import '../../../../resources/css/style.css';
import { fetchCustomerBegin, fetchCustomerError, fetchCustomerSuccess } from '../../../actions/models/customers';
import Error from '../../../components/utility/Error';
import OrderCreationContainer from '../common/OrderCreationContainer';
import OrderCreationTitle from '../common/OrderCreationTitle';
import OrderCreationSearchBar from '../common/OrderCreationSearchBar';
import OrderCreationFooter from '../common/OrderCreationFooter';
import OrderCreationSelect from '../common/OrderCreationSelect';

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
        const { customers } = this.props;

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

        return Object.values(depYearCustomers).map((dep) => <CustomerListDepartmentGroup key={dep.department} department={dep}/>);
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

export default connect(mapStateToProps)(CustomerList);