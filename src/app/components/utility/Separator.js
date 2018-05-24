import React from 'react';

export default function Separator (props){
    let {color, width, height, my, mx, className} = props;

    let borderColor = ''
    if(color){
        borderColor = `border-${color}`;
    }

    if(!width){
        width = 'full'
    }

    if(!height){
        height = 0
    }

    if(!my){
        my = 6
    }

    if(!mx){
        mx = 0;
    }

    return (
        <hr className={className ? className : `border-t w-${width} border-${height} my-${my} mx-${mx} ${borderColor}`}/>
    );
}