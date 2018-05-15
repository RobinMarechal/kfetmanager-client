import React from 'react';

export default function OrderCreationSearchBar (props){

    const {onFocus, onBlur, onKeyDown, onChange, placeholder } = props;

    return (
        <input className="border rounded px-4 py-2 my-0 w-full shadow"
               type="text"
               placeholder={placeholder}
               onKeyDown={onKeyDown}
               onChange={onChange}
               onFocus={onFocus}
               onBlur={onBlur}
        />
    );
}