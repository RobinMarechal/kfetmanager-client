import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/fontawesome-free-solid/index';

export default function Error() {
    return (
        <div className="px-4 py-8 text-center">
            <FontAwesomeIcon icon={faSpinner} spin size="2x"/>
        </div>
    );
}