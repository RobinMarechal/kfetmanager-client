import React from 'react';
import TreasuryState from './TreasuryState';
import ServerState from './ServerState';
import Treasury from '../../models/Treasury';

export default class States extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            online: false,
            balance: -1,
        }
    }

    async updateState(){
        try {
            const treasury = await Treasury.getTreasury();

            if (this.state.balance !== treasury.balance || this.state.online === false) {
                this.setState({
                    online: true,
                    balance: treasury.balance,
                });
            }
        }
        catch (e) {
            if (this.state.online === true) {
                this.setState({
                    online: false,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){

    }

    componentDidMount() {
        this.interval = setInterval(async () => {
            await this.updateState();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {balance, online} = this.state;

        return (
            <div className="w-1/4">
                <TreasuryState balance={balance} className="w-1/2"/>
                <ServerState status={online} className="w-1/2"/>
            </div>
        );
    }
}