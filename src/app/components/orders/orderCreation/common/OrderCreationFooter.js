import React from 'react';
import { connect } from 'react-redux';
import lang from '../../../../../resources/lang/index';

function OrderCreationFooter(props) {
    const { title, name } = props;

    return (
        <p className="text-grey-darker italic mt-auto">
            {title}{lang(':')} <span className="capitalize"> {name} </span>
        </p>
    );
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(OrderCreationFooter);