import React from 'react';
import NewOrderButton from '../header/NewOrderButton';
import '../../../resources/css/style.css';
import SearchBar from '../header/SearchBar';
import States from '../header/States';

export default function Header(props) {
    return (
        <nav className="flex items-center justify-between flex-wrap px-6 bg-purple shadow">
            <NewOrderButton/>
            <SearchBar/>
            <States/>
        </nav>
    );
}