import React from 'react';
import {langCapitalize} from '../../../../resources/lang';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/fontawesome-free-solid';
import _ from 'lodash';

export default function PanelTitle(props) {
    const {title, button} = props;

    let btn = '';
    if (button && _.isFunction(button.onClick)) {
        btn = (
            <button className="block text-grey-light hover:text-grey" title={button.tooltip} onClick={button.onClick}>
                <FontAwesomeIcon icon={faPlus} size="2x"/>
            </button>
        );
    }

    return (
        <div className="text-grey-darkest border-grey-light p-4 flex flex-row justify-between">
            <h2>
                {title}
            </h2>
            {btn}
        </div>
    );
}