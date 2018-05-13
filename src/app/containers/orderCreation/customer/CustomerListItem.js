import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { customerClicked } from '../../../actions/models/customers/index';

class CustomerListItem extends React.Component {
    render() {
        const { customer, selectedCustomer, customerClicked } = this.props;

        const classes = selectedCustomer.id === customer.id ? 'bg-purple-lighter' : 'hover:bg-purple-lighter';

        return (
            <li className={"px-4 py-2 border-t cursor-pointer " + classes} onClick={() => customerClicked(this.props.customer)}>
                <p className="pl-6 capitalize">
                    {customer.name}
                </p>
            </li>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        customerClicked: customerClicked,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CustomerListItem);