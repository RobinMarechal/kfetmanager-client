import React from 'react';

export default function Button(props) {
    let { bgColor, hoverBgColor, textColor, width, className, children, onClick, title, disabled, disabledCursor, disabledBgColor, disabledTitle } = props;

    if (!bgColor) {
        bgColor = 'purple-light';
    }

    if (!hoverBgColor) {
        hoverBgColor = 'purple';
    }

    if (!textColor) {
        textColor = 'white';
    }

    if (!width) {
        width = 'full';
    }

    if (!disabledCursor) {
        disabledCursor = 'cursor-not-allowed';
    }

    if (!disabledBgColor) {
        disabledBgColor = 'purple-lighter';
    }

    let disabledClasses = '';
    if (disabled) {
        disabledClasses = `${disabledCursor}`;
        hoverBgColor = bgColor = disabledBgColor;
        title = disabledTitle;
    }

    if(!className){
        className = ''
    }

    return (
        <button onClick={onClick}
                title={title}
                className={`shadow font-bold py-2 px-8 rounded bg-${bgColor} hover:bg-${hoverBgColor} text-${textColor} w-${width} ${className} ${disabledClasses}`}>
            {children}
        </button>
    );
}