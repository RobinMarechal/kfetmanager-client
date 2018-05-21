import React from 'react';
import lang from '../../../resources/lang/index';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/fontawesome-free-solid/index.es';
import { upperFirstLetter } from '../../../libs/helpers';

class TreasuryState extends React.Component {
    render() {
        let { balance, formattedBalance } = this.props;

        return (
            <div className="w-1/2 float-right w-1/2 py-3 px-8 border-l-2 border-purple-light border-r-2 text-center text-capitalize">
                <div className="text-grey-light text-sm">
                    {lang('treasury')}{lang(':')}

                    <Link to="manage-treasury">
                        <span className="ml-1 text-grey-lighter hover:text-grey" title={lang('manageTreasury', upperFirstLetter)}>
                            <FontAwesomeIcon icon={faCog}/>
                        </span>
                    </Link>
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