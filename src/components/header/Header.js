import React from 'react';
import NewOrderButton from './NewOrderButton';
import '../../resources/css/style.css';
import SearchBar from './SearchBar';
import States from './States';

export default function Header(props) {
    return (
        <nav className="flex items-center justify-between flex-wrap px-6 bg-purple">
            <NewOrderButton/>
            <SearchBar/>
            <States/>
        </nav>

    );
}