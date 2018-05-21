import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid/index';
import classNames from 'classnames';


export default function OrderCreationTitle(props) {
    const { previous, next, title } = props;

    return (
        <h2 className="capitalize mb-4 flex justify-between text-grey-darkest">
            <button className={
                classNames("text-grey-darker border rounded px-4 py-1 hover:shadow", {
                    'hover:bg-grey-lightest': previous,
                    'bg-grey-lighter cursor-not-allowed': !previous
                })}
                    onClick={previous}>
                <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
            </button>
            {title}
            <button className={
                classNames("text-grey-darker border rounded px-4 py-1 hover:shadow", {
                    'hover:bg-grey-lightest': next,
                    'bg-grey-lighter cursor-not-allowed': !next
                })}
                    onClick={next}>
                <FontAwesomeIcon icon={faArrowRight} size="lg"/>
            </button>
        </h2>
    );
}

