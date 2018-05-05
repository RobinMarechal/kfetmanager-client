import React from 'react';
import lang from '../../resources/lang';
import {upperFirstLetter} from '../../libs/helpers';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w-1/2">
                <input
                    className="bg-transparent appearance-none border-b-2 w-auto hover:border-purple-lightest w-5/6 py-2 px-2 placeholder-grey-light text-grey-lightest"
                    id="inline-full-name"
                    type="text"
                    placeholder={upperFirstLetter(lang('search'))}/>
            </div>
        );
    }
}