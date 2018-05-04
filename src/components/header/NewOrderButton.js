import React from 'react';
import lang from '../../resources/lang';

export default function NewOrderButton(props) {
    return (
        <div className="flex items-center flex-no-shrink text-white mr-6">
            <button className="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 rounded" type="button">
                {lang('newOrder').upperFirstLetters()}
            </button>
        </div>
    );
}