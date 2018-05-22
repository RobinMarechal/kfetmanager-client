import React from 'react';

export default function Error(props) {
    let { className, tooltip } = props;

    if (!className) {
        className = 'px-1 bg-grey cursor-pointer text-grey-lightest text-xs rounded-lg';
    }

    return (
        <span style={{paddingTop: '2px', paddingBottom: '1px'}} className={className} title={tooltip}>?</span>
    );
}