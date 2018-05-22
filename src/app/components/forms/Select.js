import React from 'react';
import _ from 'lodash';

export default function Select(props) {

    const { className, items, onChange, allValue, allText, itemFormatter } = props;

    return (
        <div className={"w-full relative " + className}>
            <select
                onChange={onChange}
                className="w-full block appearance-none bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded "
            >
                <option key="-1" value={allValue}>{allText}</option>
                {items.map((item) => <option key={item} value={item}>{!_.isFunction(itemFormatter) ? item : itemFormatter(item)}</option>)}
            </select>

            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    );
}