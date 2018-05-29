import React from 'react';
import TreasuryState from './TreasuryState';
import ServerState from './ServerState';
import Treasury from '../../models/Treasury';
import { connect } from 'react-redux';
import { fetchTreasuryError } from '../../actions/models/treasury/index';
import { fetchTreasurySuccess } from '../../actions/models/treasury/fetchActions';
import { formatNumber } from '../../../libs/helpers';
import Config from '../../../libs/Config';

class States extends React.Component {
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.props.dispatch(this.fetchTreasury());
        this.interval = setInterval(() => {
            this.props.dispatch(this.fetchTreasury());
        }, Config.instance.get('app.serverCheckInterval', 0));
    }

    fetchTreasury() {
        return async function (dispatch) {
            try {
                const treasury = await Treasury.getTreasury();
                dispatch(fetchTreasurySuccess(treasury));
                return treasury;
            }
            catch (e) {
                dispatch(fetchTreasuryError('error'));
                return null;
            }

        };
    }

    render() {
        const { error, treasury } = this.props.treasury;

        let formattedBalance = '?';
        let balance = -1;
        if (treasury) {
            balance = treasury.balance;
            formattedBalance = formatNumber(balance, 2);
        }

        return (
            <div className="w-1/4">
                <TreasuryState balance={balance} formattedBalance={formattedBalance}/>
                <ServerState error={error}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        treasury: state.treasury
    };
}

export default connect(mapStateToProps)(States);