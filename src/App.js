import React, {Component} from 'react';
import {TRANSLATIONS} from './resources/lang';
import Header from './components/header/Header';

class App extends Component {
    render() {
        return (
            <Header/>
        )
    }
}

export default App;

console.log(TRANSLATIONS);
