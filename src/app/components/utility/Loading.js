import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/fontawesome-free-solid/index';

export default function Loading(props) {
    let { className, size} = props;

    if(!className){
        className = 'px-4 py-4 leading-loose'
    }

    if(!size){
        size = '2x';
    }

    return (
        <div className={'text-center ' + className}>
            <FontAwesomeIcon icon={faSpinner} spin size={size}/>
        </div>
    );
}