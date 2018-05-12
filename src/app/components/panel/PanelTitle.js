import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import lang from '../../../resources/lang';
import { upperFirstLetter } from '../../../libs/helpers';

export default function PanelTitle(props) {
    const { title, buttons } = props;

    let btns = '';

    if (buttons && buttons.length > 0) {

        btns = buttons.map(({ tooltip, onClick, icon }, i) => {
            return (
                <button key={i}
                        className="block text-grey-light mx-1 hover:text-grey"
                        title={lang(tooltip, upperFirstLetter)}
                        onClick={onClick}>
                    <FontAwesomeIcon icon={icon} size="2x"/>
                </button>
            );
        });
    }

    return (
        <div className="text-grey-darkest border-grey-light p-4 flex justify-between flex-row">
            <h2 className="content-start">
                {title}
            </h2>
            <div className="flex">
                {btns}
            </div>
        </div>
    );
}