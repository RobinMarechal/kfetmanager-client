import React from 'react';

export default function FlexDiv(props) {
    let { children, flex, justify, className } = props;

    flex = !flex ? '' : `flex-${flex}`;

    if (!justify) {
        justify = 'between';
    }

    if (!className) {
        className = '';
    }


    return (
        <div className={`flex ${flex} justify-${justify} ${className}`}>
            {children}
        </div>
    );
}