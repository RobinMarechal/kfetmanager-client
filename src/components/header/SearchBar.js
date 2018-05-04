import React from 'react';
import lang from '../../resources/lang';

export default function SearchBar(props) {
    return (
        <div className="md:w-2/3">
            <input
                className="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker"
                id="inline-full-name"
                type="text"
                placeholder={lang('search').upperFirstLetters()}/>
        </div>
    );
}