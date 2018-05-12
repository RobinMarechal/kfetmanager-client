import React from 'react';
import lang from '../../../resources/lang/index';
import {upperFirstLetter} from '../../../libs/helpers';

export default class SearchBar extends React.Component {
    render() {
        return (
            <div className="w-1/2">
                <form action="search">
                    <input
                        name="q"
                        className="no-outline bg-transparent appearance-none border-b-2 w-auto hover:border-purple-lightest w-5/6 py-2 px-2 placeholder-grey-light text-grey-lightest"
                        id="inline-full-name"
                        type="text"
                        placeholder={upperFirstLetter(lang('search'))}
                    />
                </form>
            </div>
        );
    }
}