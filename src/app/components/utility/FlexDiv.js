import React from 'react';

export default function FlexDiv (props){
    let {children, flex, justify, className} = props;

    flex = !flex ? 'flex' : 'flex-col';

    if(!justify){
        justify = 'between'
    }


    return (
        <div className={`${flex} justify-${justify} ${className}`}>
            {children}
        </div>
    );
}