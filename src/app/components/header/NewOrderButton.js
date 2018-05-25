import React from 'react';
import { langUpperFirstLetter } from '../../../resources/lang/index';
import { Link } from 'react-router-dom';

function NewOrderButton() {
    return (
        <div className="w-1/4 flex items-center text-white">
            <Link to="/new-order">
                <button
                    className="shadow bg-purple-light hover:bg-purple-lighter text-white font-bold py-2 px-8 rounded"
                    type="button">
                    {langUpperFirstLetter('newOrder')}
                </button>
            </Link>
        </div>
    );
}

export default NewOrderButton;