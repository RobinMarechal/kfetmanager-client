import React from 'react';
import { connect } from 'react-redux';
import CustomerList from '../containers/orderCreation/customer/CustomerList';
import MenuList from '../containers/orderCreation/menu/MenuList';
import ProductList from '../containers/orderCreation/products/ProductList';
import OrderCreationSummary from '../containers/orderCreation/OrderCreationSummary';
import * as ReactDOM from 'react-dom';

const CUSTOMER_SELECTION = 1;
const MENU_SELECTION = 2;
const PRODUCT_SELECTION = 3;

class OrderCreation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            panel: CUSTOMER_SELECTION,
            ctrl: false,
            enableKeymaps: true,
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
        return (
            <div className="flex justify-between px-6 py-6" ref="newOrderContainer" onKeyDown={this.keyDown} onKeyUp={this.keyUp} tabIndex="0">
                {
                    (this.state.panel === CUSTOMER_SELECTION) ?
                        <CustomerList toggleKeymaps={this.toggleKeymaps} next={this.next}/> : (this.state.panel === MENU_SELECTION) ?
                        <MenuList toggleKeymaps={this.toggleKeymaps} next={this.next} previous={this.previous}/> :
                        <ProductList toggleKeymaps={this.toggleKeymaps} previous={this.previous} submit={this.submit}/>
                }

                <OrderCreationSummary/>
            </div>
        );
    }

    toggleKeymaps() {
        this.setState({ enableKeymaps: !this.state.enableKeymaps });
    }

    keyDown(event) {
        if(this.state.enableKeymaps) {
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
        if (this.state.panel !== PRODUCT_SELECTION && this.state.panel < PRODUCT_SELECTION) {
            this.setState({ panel: this.state.panel + 1 });
        }
        this.focusDiv();
    }

    previous() {
        if (this.state.panel !== CUSTOMER_SELECTION && this.state.panel > CUSTOMER_SELECTION) {
            this.setState({ panel: this.state.panel - 1 });
        }
        this.focusDiv();
    }

    submit() {
        console.log('submit');
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(OrderCreation);