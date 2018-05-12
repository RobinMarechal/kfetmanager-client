import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid/index';
import lang from '../../../resources/lang';

export default function Error() {
    return (
        <div className="text-red font-bold">
            <FontAwesomeIcon icon={faTimes}/>
            <p className="capitalize">{lang('anErrorOccurred')}</p>
        </div>
    );
}