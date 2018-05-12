import React from 'react';
import { connect } from 'react-redux';
import { awaitOrEmpty, upperFirstLetter } from '../../../libs/helpers';
import lang from '../../../resources/lang';
import Customer from '../../models/Customer';
import CustomerListDepartmentGroup from './CustomerListDepartmentGroup';
import Config from '../../../libs/Config';
import '../../../resources/css/style.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid/index';
import { fetchCustomerBegin, fetchCustomerSuccess } from '../../actions/models/customers';
import Loading from '../../components/utility/Loading';
import Error from '../../components/utility/Error';

class CustomerList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };

        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(this.fetchCustomers());
    }


    fetchCustomers(whereLike = null) {
        return async function (dispatch) {
            dispatch(fetchCustomerBegin());
            let query = new Customer();

            if (whereLike) {
                query = query.where('name', 'LIKE', `%${whereLike}%`);
            }

            let customers = await awaitOrEmpty(query.all());
            dispatch(fetchCustomerSuccess(customers));

            return customers;
        };
    }

    buildList() {
        const { loading, error } = this.props.customers;

        if (error) {
            return <Error/>;
        }
        // else if (loading) {
        //     return <Loading/>;
        // }

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

    handleInputChange(event) {
        // this.setState({ inputValue: event.target.value });
        this.props.dispatch(this.fetchCustomers(event.target.value));
    }

    handleInputKeyDown(event) {
        // if (event.key === 'Enter') {
        //     const text = this.state.inputValue;
        //     this.setState({ inputValue: '' });
        //     this.props.dispatch(this.fetchCustomers(text));
        // }
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(CustomerList);