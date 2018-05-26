import React from 'react';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './controllers/Home/Home';
import SearchResult from './controllers/SearchResult';
import OrderCreation from './controllers/orders/creation/OrderCreation';
import OrderHistory from './controllers/orders/history/OrderHistory';
import ManageProducts from './controllers/products/ManageProducts';
import ManageCustomers from './controllers/customers/ManageCustomers';
import ManageTreasury from './controllers/treasury/ManageTreasury';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { keyDown, keyUp } from './actions/keyMapActions';
import ManageRestockings from './controllers/restockings/ManageRestockings';

class App extends React.Component {

    componentWillMount(){
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    render() {
        return (
            <Router>
                <div onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} tabIndex="0">
                    <Header/>

                    <Switch>
                        <Route exact path="/" component={Home}/>

                        <Route exact path="/new-order" component={OrderCreation}/>

                        <Route exact path="/order-history" component={OrderHistory}/>

                        <Route exact path="/manage-treasury" component={ManageTreasury}/>

                        <Route exact path="/manage-products" component={ManageProducts}/>
                        <Route exact path="/manage-products/restockings" component={ManageRestockings}/>

                        <Route exact path="/manage-customers" component={ManageCustomers}/>

                        <Route path="/search" component={SearchResult}/>

                        <Route component={E404}/>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }

    onKeyDown(event) {
        this.props.keyDown(event.key);
    }

    onKeyUp(event) {
        this.props.keyUp(event.key);
    }
}

function E404() {
    return (
        <div style={{ marginTop: '150px' }} className="text-grey-darkest">
            <p className="text-3xl text-center">
                Page not found...
            </p>
            <p className="text-2xl italic text-center">
                ({window.location.href})
            </p>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        keyPressed: state.keyPressed,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        keyUp,
        keyDown,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
