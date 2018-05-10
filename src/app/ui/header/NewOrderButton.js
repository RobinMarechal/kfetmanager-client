import React from 'react';
import lang, {langUpperFirstLetter} from '../../../resources/lang/index';
import {upperFirstLetter} from '../../libs/helpers';

export default function NewOrderButton(props) {
    return (
        <div className="w-1/4 flex items-center text-white">
            <button className="shadow bg-purple-light hover:bg-purple-lighter text-white font-bold py-2 px-8 rounded" type="button">
                {langUpperFirstLetter('newOrder')}
            </button>
        </div>
    );
}