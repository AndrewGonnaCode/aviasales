import React, {Component} from 'react';
import Filters from "./containers/Filters/Filters";
import './App.css';
import logo from './images/logo.svg'
import Tickets from "./containers/Tickets/Tickets";


class App extends Component {
    render() {
        return (
            <div className='App'>
                <p><a name="top"></a></p>
                <div className='container'>
                    <div className="logo">
                        <img src={logo} alt="Логотип"/>
                    </div>
                    <Filters/>
                    <Tickets/>
                </div>
                    <a className='scroll-to-top' href="#top"></a>
            </div>
        )
    }
}

export default App;