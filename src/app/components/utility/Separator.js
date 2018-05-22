import React from 'react';

export default function Separator (props){
    let {color, width, height, my, mx, className} = props;

    if(!color){
        color = 'grey'
    }

    if(!width){
        width = 'full'
    }

    if(!height){
        height = 1
    }

    if(!my){
        my = 6
    }

    if(!mx){
        mx = 0;
    }

    return (
        <hr className={`border-t w-${width} border-${height} my-${my} mx-${mx} bg-${color}`}/>
    );
}