import React from 'react';
import lang from '../../../resources/lang/index';
import classNames from 'classnames';

class TreasuryState extends React.Component {
    render() {
        let { balance, formattedBalance } = this.props;

        return (
            <div className="w-1/2 float-right w-1/2 py-3 px-8 border-l-2 border-purple-light border-r-2 text-center text-capitalize">
                <div className="text-grey-light text-sm">
                    {lang('treasury')}{lang(':')}
                </div>
                <div className={classNames("text-base text-bold",
                                           {
                                               "text-green-light": balance > 0,
                                               "text-red-dark": balance <= 0,
                                           })}>
                    {formattedBalance}€
                </div>
            </div>
        );
    }
}

export default TreasuryState;