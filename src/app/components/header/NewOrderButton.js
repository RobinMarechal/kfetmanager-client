import React from 'react';
import { langUpperFirstLetter } from '../../../resources/lang/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createOrder } from '../../actions/models/orders';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

// const customStyles = {
//     content: {
//         top: '30%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         // transform: 'translate(-50%, -50%)',
//
//     },
// };

class NewOrderButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: true,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render() {
        return (
            <div className="w-1/4 flex items-center text-white">
                <Link to="/new-order">
                    <button
                        className="shadow bg-purple-light hover:bg-purple-lighter text-white font-bold py-2 px-8 rounded"
                        onClick={this.openModal}
                        type="button">
                        {langUpperFirstLetter('newOrder')}
                    </button>
                </Link>
            </div>
        );
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    openModal() {
        console.log('ello');
        this.setState({ modalIsOpen: true });
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        createOrder: createOrder,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewOrderButton);