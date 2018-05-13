import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid/index';
import lang from '../../../resources/lang';

export default function Error() {
    return (
        <div className="px-4 py-8 text-center text-red leading-loose">
            <FontAwesomeIcon icon={faTimes} size="3x"/>
            <p className="capitalize">{lang('anErrorOccurred')}</p>
        </div>
    );
}