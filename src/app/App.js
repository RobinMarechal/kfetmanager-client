import React from 'react';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './controllers/Home/Home';
import SearchResult from './controllers/SearchResult';
import OrderCreation from './controllers/OrderCreation/OrderCreation';

function App(props) {
    return (
        <Router>
            <div>
                <Header/>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/new-order" component={OrderCreation}/>
                    <Route path="/search" component={SearchResult}/>
                </Switch>

                <Footer/>
            </div>
        </Router>
    );

}

export default App;
