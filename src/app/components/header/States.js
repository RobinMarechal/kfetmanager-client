import React from 'react';
import TreasuryState from './TreasuryState';
import ServerState from './ServerState';
import Treasury from '../../models/Treasury';
import { connect } from 'react-redux';
import { fetchTreasuryBegin, fetchTreasuryError } from '../../actions/models/treasury';
import { fetchTreasurySuccess } from '../../actions/models/treasury/fetchActions';

class States extends React.Component {
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.props.dispatch(this.fetchTreasury());
        this.interval = setInterval(() => {
            this.props.dispatch(this.fetchTreasury());
        }, 5000);
    }

    fetchTreasury() {
        return async function (dispatch) {
            dispatch(fetchTreasuryBegin());
            try{
                const treasury = await Treasury.getTreasury();
                dispatch(fetchTreasurySuccess(treasury));
                return treasury;
            }
            catch(e){
                console.log('tr earror');
                dispatch(fetchTreasuryError('error'));
                return null;
            }

        };
    }

    render() {
        return (
            <div className="w-1/4">
                <TreasuryState className="w-1/2"/>
                <ServerState className="w-1/2"/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(States);