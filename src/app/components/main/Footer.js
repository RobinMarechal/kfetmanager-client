import React from 'react';
import lang from '../../../resources/lang/index';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/fontawesome-free-regular/index';
import { upperFirstLetter } from '../../../libs/helpers';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <nav
            className="text-center flex items-center justify-between flex-wrap px-6 bg-purple-darker text-grey fixed pin-b w-full h-12">
            <div className="w-1/3">
                <Link className="text-grey hover:text-grey-light no-underline hover:underline" to="/">
                    {upperFirstLetter(lang('home'))}
                </Link>
            </div>
            <div className="w-1/3"> - KfetManager -</div>
            <div className="w-1/3">
                <FontAwesomeIcon icon={faCopyright} size="sm"/> <a target="_BLANK"
                                                                   rel="noopener noreferrer"
                                                                   className="text-grey hover:text-grey-light no-underline hover:underline"
                                                                   href="https://www.linkedin.com/in/RobinMarechal/">Robin Maréchal</a>
            </div>
        </nav>
    );
}