import React from 'react';
import { connect } from 'react-redux';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid/index';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import lang from '../../../resources/lang';

class ProductList extends React.Component {
    render() {
        return (
            <div className="w-2/3 p-4 mr-3 rounded shadow-md h-full">
                <h2 className="capitalize mb-4 flex justify-between text-grey-darkest">
                    <button className="text-grey-darker border rounded px-4 py-1 hover:bg-grey-lightest hover:shadow" onClick={this.props.previous}>
                        <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                    </button>
                    {lang('productSelection')}
                    <button className="text-grey border rounded px-4 py-1 bg-grey-lighter hover:p hover:shadow cursor-not-allowed">
                        <FontAwesomeIcon icon={faArrowRight} size="lg"/>
                    </button>
                </h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(ProductList);