import React from 'react';
import { faPlus } from '@fortawesome/fontawesome-free-solid/index.es';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { upperFirstLetter } from '../../../libs/helpers';
import lang from '../../../resources/lang';

export default class AddRestockingButton extends React.Component {

    render() {
        const {onClick} = this.props;

        return (
            <button style={{ width: '59px' }}
                    onClick={onClick}
                    title={lang('new restocking', upperFirstLetter)}
                    className="hover:bg-purple-dark py-4 text-center align-middle absolute pin-b pin-r mr-6 mb-6 text-2xl rounded-full shadow-md bg-purple text-white font-bold">
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        );
    }
}