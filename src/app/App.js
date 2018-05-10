import React, {Component} from 'react';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Home from './views/Home';
import SearchResult from './views/SearchResult';

function App(props) {
    return (
        <Router>
            <div>
                <Header/>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/search" component={SearchResult}/>
                </Switch>

                <Footer/>
            </div>
        </Router>
    );

}

export default App;
