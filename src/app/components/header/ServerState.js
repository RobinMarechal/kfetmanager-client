import React from 'react';
import lang from '../../../resources/lang/index';
import '../../../index.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/fontawesome-free-solid'


export default function ServerState (props){
    const { status } = props;

    return (
        <div className="float-right w-1/2 py-3 px-8 border-l-2 border-purple-light text-center text-capitalize">
            <div className="text-grey-light text-sm">
                {lang('server')}{lang(':')}
            </div>
            <div className={"text-base text-" + (status ? "green-light" : "red-dark")}>
                <FontAwesomeIcon icon={faCircle} size="sm"/> {lang(status ? 'online': 'offline')}
            </div>
        </div>
    );
}