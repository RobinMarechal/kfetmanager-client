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

function App() {
    return (
        <Router>
            <div>
                <Header/>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/new-order" component={OrderCreation}/>
                    <Route exact path="/order-history" component={OrderHistory} />
                    <Route exact path="/manage-treasury" component={ManageTreasury} />
                    <Route exact path="/manage-products" component={ManageProducts} />
                    <Route exact path="/manage-customers" component={ManageCustomers} />
                    <Route path="/search" component={SearchResult}/>

                    <Route component={E404}/>
                </Switch>

                <Footer/>
            </div>
        </Router>
    );
}

function E404(){
    return (
        <div>
            <p className="text-3xl">
                Page not found...
            </p>
        </div>
    )
}

export default App;
