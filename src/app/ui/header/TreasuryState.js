import React from 'react';
import lang from '../../../resources/lang/index';
import {formatNumber} from '../../libs/helpers';

export default function TreasuryState(props) {
    const {balance} = props;
    let formattedBalance = formatNumber(balance, 2)
    return (
        <div className="float-right w-1/2 py-3 px-8 border-l-2 border-purple-light border-r-2 text-center text-capitalize">
            <div className="text-grey-light text-sm">
                {lang('treasury')}{lang(':')}
            </div>
            <div className={"text-base text-bold text-" + (balance > 0 ? "green-light" : "red-dark")}>
                {formattedBalance}€
            </div>
        </div>
    );
}