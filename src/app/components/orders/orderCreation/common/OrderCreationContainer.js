import React from 'react';
import Config from '../../../../../libs/Config';

export default function OrderCreationContainer(props) {
    const { children } = props;
    return (
        <div className="w-2/3 relative p-4 mr-3 rounded shadow-md h-full flex flex-col justify-start" style={{ height: Config.bodyHeight }}>
            {children}
        </div>
    );
}