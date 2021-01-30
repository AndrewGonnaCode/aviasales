import React, {Component} from 'react';
import {connect} from 'react-redux';
import Filters from "./containers/Filters/Filters";
import './App.css';
import logo from './images/logo.svg'
import Tickets from "./containers/Tickets/Tickets";
import {getSearchId} from "./store/actions/tickets";


class App extends Component {

    componentDidMount() {

    }


    render() {
        return (
            <div className='App'>
                <div className='container'>
                    <div className="logo">
                        <img src={logo} alt="Логотип"/>
                    </div>
                    <Filters/>
                    <Tickets/>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);