import React from 'react';
import TreasuryState from './TreasuryState';
import ServerState from './ServerState';
import Treasury from '../../app/models/Treasury';

export default class States extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            online: true,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(prevProps, prevState, snapshot);
    }

    componentDidMount() {
        this.interval = setInterval(async () => {
            try {
                const treasury = await Treasury.getTreasury();

                if (this.state.balance != treasury.balance || this.state.online === false) {
                    console.log(1);
                    this.setState({
                        online: true,
                        balance: treasury.balance,
                    });
                }
            }
            catch (e) {
                console.log(e);
                if (this.state.online === true) {
                    console.log(0);
                    this.setState({
                        online: false,
                    });
                }
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {balance, online} = this.state;

        return (
            <div>
                <TreasuryState balance={balance}/>
                <ServerState status={online}/>
            </div>
        );
    }
}