import React from 'react';
import { connect } from 'react-redux';
import { awaitOrEmpty, upperFirstLetter } from '../../../../libs/helpers';
import lang from '../../../../resources/lang/index';
import Customer from '../../../models/Customer';
import CustomerListDepartmentGroup from './CustomerListDepartmentGroup';
import Config from '../../../../libs/Config';
import '../../../../resources/css/style.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid/index';
import { fetchCustomerBegin, fetchCustomerError, fetchCustomerSuccess } from '../../../actions/models/customers';
import Error from '../../../components/utility/Error';

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
            // try {
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

                console.log(query);

                let customers = await query.all();
                dispatch(fetchCustomerSuccess(customers));

                return customers;
            // }
            // catch (e) {
            //     console.log(e);
            //     dispatch(fetchCustomerError());
            //     return [];
            // }
        };
    }

    buildList() {
        const { error } = this.props.customers;

        if (error) {
            return <Error/>;
        }

        let { customers } = this.props;
        let depYearCustomers = Customer.sortByYearDepartmentAndName(customers.items);
        depYearCustomers = Customer.customersToDepartmentYearCustomerList(depYearCustomers);

        return Object.values(depYearCustomers).map((dep) => <CustomerListDepartmentGroup key={dep.department} department={dep}/>);
    }

    render() {
        return (
            <div className="w-2/3 p-4 mr-3 rounded shadow-md h-full">
                <h2 className="capitalize mb-4 flex justify-between text-grey-darkest">
                    <button className="text-grey border rounded px-4 py-1 bg-grey-lighter hover:p hover:shadow cursor-not-allowed">
                        <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                    </button>
                    {lang('customerSelection')}
                    <button className="text-grey-darker border rounded px-4 py-1 hover:bg-grey-lightest hover:shadow" onClick={this.props.next}>
                        <FontAwesomeIcon icon={faArrowRight} size="lg"/>
                    </button>
                </h2>

                <input className="border rounded px-4 py-2 w-full shadow"
                       type="text"
                       placeholder={lang("searchCustomer", upperFirstLetter)}
                       onKeyDown={this.handleInputKeyDown}
                       onChange={this.handleInputChange}
                       onFocus={this.props.toggleKeymaps}
                       onBlur={this.props.toggleKeymaps}
                />

                <div className="flex justify-between my-4">
                    <div className="relative mr-3 w-1/2">
                        <select
                            onChange={this.handleDepartmentSelectChange}
                            className="w-full block appearance-none bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow">
                            <option value="*">{lang('allDepartments', upperFirstLetter)}</option>
                            {Customer.DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>

                    <div className="relative ml-3 w-1/2">
                        <select
                            onChange={this.handleYearSelectChange}
                            className="w-full block appearance-none bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow">
                            <option value="*">{lang('allYears', upperFirstLetter)}</option>
                            {Customer.YEARS.map((y) => <option key={y} value={y}>{lang(y)}</option>)}
                        </select>
                        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <ul className="indent-lg px-0 text-grey-darkest overflow-y-auto shadow border rounded list-style-none mb-4"
                    style={{ maxHeight: Config.bodyHeight }}>
                    {this.buildList()}
                </ul>

                <p className="text-grey-darker italic">
                    {lang('selectedCustomer', upperFirstLetter)}{lang(':')}
                    <span className="capitalize">
                        {this.props.selectedCustomer.name}
                    </span>
                </p>
            </div>
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
        if(event.target.value){
            this.props.dispatch(this.fetchCustomers({
                left: 'name',
                operator: 'LIKE',
                right: '%' + event.target.value + '%',
            }));
        }
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