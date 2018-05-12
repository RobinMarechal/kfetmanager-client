import React from 'react';
import { connect } from 'react-redux';

class OrderCreationSummary extends React.Component {
    render() {
        const { selectedCustomer } = this.props;

        const name = selectedCustomer.id ? selectedCustomer.name : '-';

        return (
            <div className="p-4 ml-3 w-1/3 text-grey-darkest rounded shadow-md">
                <h2 className="mb-4">Summary</h2>
                <table className="text leading-loose">
                    <tbody>
                    <tr>
                        <td className="align-top w-32">Customer :</td>
                        <td className="leading-normal text-grey-dark">
                            <i>{name}</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">Menu :</td>
                        <td className="leading-normal text-grey-dark">
                            <i>C++</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">Produits :</td>
                        <td className="leading-normal text-grey-dark">
                            <i>Pizza Royale, Kinder Bueno, Coca Cola, Fanta, Picard Tartiflette</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">Prix de base :</td>
                        <td className="leading-normal text-grey-dark">
                            <i>3.20€</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">Réduction :</td>
                        <td className="leading-normal text-grey-dark">
                            <i>0.20€</i>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-top">Prix final :</td>
                        <td className="leading-normal text-grey-dark">
                            <i>3.00€</i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(OrderCreationSummary);