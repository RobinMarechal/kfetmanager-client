import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

export default function Select(props) {

    let {
        className,
        items,
        onChange,
        allValue,
        allText,
        itemFormatter,
        name,
        otherProps,
        disableAll,
        displayDefault,
        selected,
        invalidBorderColor,
        invalid,
    } = props;

    if (!displayDefault && displayDefault !== false) {
        displayDefault = true;
    }

    if (!allValue) {
        allValue = 'null';
    }

    if (!selected) {
        selected = 'null';
    }

    if (!invalidBorderColor) {
        invalidBorderColor = 'red-light';
    }
    invalidBorderColor = `border-${invalidBorderColor}`;

    return (
        <div className={"w-full relative " + className}>
            <select
                defaultValue={selected}
                {...otherProps}
                name={name}
                onChange={onChange}
                className={classNames(
                    "w-full block appearance-none bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded", {
                        [invalidBorderColor]: invalid,
                    })
                }
            >
                {!displayDefault ? '' : <option key="-1" value={allValue} disabled={disableAll}>{allText}</option>}
                {items.map((item) => <option key={item.value ? item.value : item}
                                             value={item.value ? item.value : item}>
                        {!_.isFunction(itemFormatter) ? (item.text ? item.text : item) : itemFormatter(item.text ? item.text : item)}
                    </option>,
                )}
            </select>

            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    );
}