import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid/index';
import lang from '../../../resources/lang';
import _ from 'lodash';

export default function Error(props) {
    let { className, size, message, textFormatter } = props;

    if (!className) {
        className = 'px-4 py-4 text-red-light';
    }

    if (!size) {
        size = '2x';
    }

    if (!message) {
        message = lang('anErrorOccurred');
    }

    if (textFormatter && _.isFunction(textFormatter)) {
        message = textFormatter(message);
    }

    return (
        <div className={'text-center ' + className}>
            <FontAwesomeIcon icon={faTimes} size={size}/>
            <p className="mt-2">{message}</p>
        </div>
    );
}