import React from 'react';
import { connect } from 'react-redux';
import CustomerList from './panels/CustomerList';
import MenuList from './panels/MenuList';
import ProductList from './panels/ProductList';
import OrderCreationSummary from '../../../components/orders/orderCreation/OrderCreationSummary';
import * as ReactDOM from 'react-dom';
import DiscountSelection from './panels/DiscountSelection';
import { Redirect } from 'react-router-dom';
import Order from '../../../models/Order';
import { clearOrderCreation } from '../../../actions/models/orders';
import { bindActionCreators } from 'redux';

const CUSTOMER_SELECTION = 1;
const MENU_SELECTION = 2;
const PRODUCT_SELECTION = 3;
const DISCOUNT_SELECTION = 4;

class OrderCreation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            panel: CUSTOMER_SELECTION,
            ctrl: false,
            enableKeymaps: true,
            redirectToHome: false,
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.submit = this.submit.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.toggleKeymaps = this.toggleKeymaps.bind(this);
    }

    componentDidMount() {
        this.focusDiv();
    }

    componentDidUpdate() {
        if (this.state.active)
            this.focusDiv();
    }

    focusDiv() {
        ReactDOM.findDOMNode(this.refs.newOrderContainer).focus();
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/"/>;
        }

        return (
            <div className="flex justify-between px-6 py-6" ref="newOrderContainer" onKeyDown={this.keyDown} onKeyUp={this.keyUp} tabIndex="0">
                {
                    (this.state.panel === CUSTOMER_SELECTION) ?
                        <CustomerList toggleKeymaps={this.toggleKeymaps} next={this.next}/> :
                        (this.state.panel === MENU_SELECTION) ?
                            <MenuList toggleKeymaps={this.toggleKeymaps} next={this.next} previous={this.previous}/> :
                            (this.state.panel === PRODUCT_SELECTION) ?
                                <ProductList toggleKeymaps={this.toggleKeymaps} next={this.next} previous={this.previous}/> :
                                <DiscountSelection toggleKeymaps={this.toggleKeymaps} previous={this.previous}/>
                }

                <OrderCreationSummary onSubmit={this.submit}/>
            </div>
        );
    }

    toggleKeymaps() {
        this.setState({ enableKeymaps: !this.state.enableKeymaps });
    }

    keyDown(event) {
        if (this.state.enableKeymaps) {
            if (event.key === 'Control') {
                this.setState({ ctrl: true });
            }
            else if (this.state.ctrl) {
                if (event.key === 'ArrowRight') {
                    this.next();
                }
                if (event.key === 'ArrowLeft') {
                    this.previous();
                }
            }
        }
    }

    keyUp(event) {
        if (event.key === 'Control')
            this.setState({ ctrl: false });
    }

    next() {
        if (this.state.panel < DISCOUNT_SELECTION) {
            this.setState({ panel: this.state.panel + 1 });
        }
        this.focusDiv();
    }

    previous() {
        if (this.state.panel > CUSTOMER_SELECTION) {
            this.setState({ panel: this.state.panel - 1 });
        }
        this.focusDiv();
    }

    async submit() {
        const { orderCreation } = this.props;

        const isValid = await Order.isValid(orderCreation);
        if(!isValid){
            // console.error("Couldn't create the order. This should not happen");
            return false;
        }

        const order = Order.fromOrderCreation(orderCreation);

        // Creation of the order in the database
        const created = await order.create();

        // We're going to request as many sync as the number of products in the order
        // We should make the requests at the same time, not one after the other
        const promises = [];
        for(const p of orderCreation.products){
            promises.push(created.attach(p));
        }

        try{
            // We wait for all the requests to finish
            await Promise.all(promises);

            this.props.clearOrderCreation();
        }
        catch(e){
            console.error('The attachment of at least one product to the order failed:');
            console.error(e);
        }

        // Redirect to home
        this.setState({ redirectToHome: true });
    }
}

function mapStateToProps(state) {
    return {
        orderCreation: state.orderCreation,
    };
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({
            clearOrderCreation
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreation);