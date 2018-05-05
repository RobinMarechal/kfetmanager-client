import React from 'react';
import lang from '../../resources/lang';

export default function TreasuryState(props) {
    const {balance} = props;
    return (
        <div className="float-right w-1/2 py-3 px-8 border-l-2 border-purple-light border-r-2 text-center text-capitalize">
            <div className="text-grey-light text-sm">
                {lang('treasury')}{lang(':')}
            </div>
            <div className={"text-base text-bold text-" + (balance > 0 ? "green-light" : "red-dark")}>
                {balance}€
            </div>
        </div>
    );
}